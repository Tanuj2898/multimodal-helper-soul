
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, ArrowLeft } from 'lucide-react';
import VoiceWaveform from '@/components/VoiceWaveform';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const VoiceRecognition: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [intensity, setIntensity] = useState(50);
  const navigate = useNavigate();
  
  // Reference to the speech recognition instance
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  
  // Initialize speech recognition on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognitionAPI) {
        const recognitionInstance = new SpeechRecognitionAPI();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';
        
        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(transcript);
          
          // Simulating microphone intensity based on speaking
          setIntensity(30 + Math.random() * 70);
        };
        
        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          toast({
            title: "Recognition Error",
            description: `Error: ${event.error}. Please try again.`,
            variant: "destructive",
          });
          setIsListening(false);
        };
        
        recognitionInstance.onend = () => {
          // Only set listening to false if we didn't intend to keep listening
          if (isListening) {
            recognitionInstance.start();
          }
        };
        
        setRecognition(recognitionInstance);
      } else {
        toast({
          title: "Not Supported",
          description: "Speech recognition is not supported in this browser.",
          variant: "destructive",
        });
      }
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      
      // Generate a response if we have transcript
      if (transcript) {
        generateResponse(transcript);
      }
    } else {
      setTranscript('');
      setResponse('');
      recognition.start();
      setIsListening(true);
    }
  }, [isListening, recognition, transcript]);

  const generateResponse = (text: string) => {
    // Simulate AI processing delay
    toast({
      title: "Processing",
      description: "Analyzing your request...",
    });
    
    setTimeout(() => {
      // Generate different responses based on user input
      let aiResponse = '';
      
      if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi')) {
        aiResponse = 'Hello! How can I assist you today?';
      } else if (text.toLowerCase().includes('name')) {
        aiResponse = 'My name is A.I.S.H.A., which stands for Artificial Intelligence Software Helpful in Assistance.';
      } else if (text.toLowerCase().includes('help')) {
        aiResponse = 'I can help you with tasks, research, health monitoring, and more. Just tell me what you need!';
      } else if (text.toLowerCase().includes('weather')) {
        aiResponse = 'I can check the weather for you! In the full version, I would connect to a weather API to provide real-time forecasts.';
      } else if (text.toLowerCase().includes('reminder') || text.toLowerCase().includes('schedule')) {
        aiResponse = 'I can set reminders and manage your schedule. In the full version, I would sync with your calendar.';
      } else {
        aiResponse = 'I understand you want to know about that. In the full version, I would connect to knowledge bases and APIs to provide detailed information on this topic.';
      }
      
      setResponse(aiResponse);
      speakResponse(aiResponse);
    }, 1500);
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Get available voices and try to use a female voice if available
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.includes('female') || 
        voice.name.includes('woman') || 
        voice.name.includes('girl') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 border-b flex items-center px-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold ml-4">
          Voice Recognition <span className="text-sm font-normal text-muted-foreground">v1.0</span>
        </h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-xl w-full space-y-8 text-center">
          <h2 className="text-3xl font-bold">A.I.S.H.A. Voice Interface</h2>
          <p className="text-muted-foreground">
            I'm listening for your commands. Speak clearly into your microphone.
          </p>
          
          <VoiceWaveform isActive={isListening} intensity={intensity} className="mx-auto my-12" />
          
          <div className="space-y-4">
            <Button 
              size="lg" 
              className={`w-full py-6 text-lg ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
              onClick={toggleListening}
            >
              {isListening ? (
                <>
                  <MicOff size={24} className="mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic size={24} className="mr-2" />
                  Start Listening
                </>
              )}
            </Button>
            
            {transcript && (
              <div className="bg-secondary p-4 rounded-lg text-left">
                <p className="text-sm font-medium">You said:</p>
                <p className="italic">{transcript}</p>
              </div>
            )}
            
            {response && (
              <div className="bg-primary/10 p-4 rounded-lg text-left">
                <p className="text-sm font-medium flex items-center">
                  <Volume2 size={16} className="mr-2" />
                  A.I.S.H.A. response:
                </p>
                <p>{response}</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <h3 className="font-medium mb-2">Supported Commands</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-secondary p-2 rounded">Ask about the weather</div>
              <div className="bg-secondary p-2 rounded">Set a reminder</div>
              <div className="bg-secondary p-2 rounded">What's your name?</div>
              <div className="bg-secondary p-2 rounded">How can you help me?</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VoiceRecognition;
