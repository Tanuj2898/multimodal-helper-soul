
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Send, Volume2, ArrowDown } from 'lucide-react';
import VoiceWaveform from './VoiceWaveform';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AssistantMode: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I am A.I.S.H.A., your Artificial Intelligence Software Helpful in Assistance. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate assistant response after a delay
    setTimeout(() => {
      let response = '';
      
      // Generate different responses based on user input
      if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        response = 'Hello! How can I assist you today?';
      } else if (input.toLowerCase().includes('name')) {
        response = 'My name is A.I.S.H.A., which stands for Artificial Intelligence Software Helpful in Assistance.';
      } else if (input.toLowerCase().includes('help')) {
        response = 'I can help you with tasks, research, health monitoring, and more. Just tell me what you need!';
      } else if (input.toLowerCase().includes('weather')) {
        response = 'I can check the weather for you! In the full version, I would connect to a weather API to provide real-time forecasts.';
      } else if (input.toLowerCase().includes('reminder') || input.toLowerCase().includes('schedule')) {
        response = 'I can set reminders and manage your schedule. In the full version, I would sync with your calendar.';
      } else {
        response = 'I understand you want to know about that. In the full version, I would provide detailed information on this topic.';
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        setInput('Can you help me with scheduling a meeting?');
      }, 3000);
    }
  };

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <div className="border-b px-6 py-2">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="voice">Voice</TabsTrigger>
              <TabsTrigger value="multilingual">Multilingual</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="chat" className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 animate-fade-in
                        ${message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                        }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-3">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleRecording}
                  className={`${isRecording ? 'bg-red-100 text-red-500' : ''}`}
                >
                  <Mic size={18} />
                </Button>
                <Input 
                  placeholder="Type a message..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button onClick={handleSendMessage} disabled={!input.trim()}>
                  <Send size={18} className="mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="voice" className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center max-w-md space-y-6">
              <VoiceWaveform isActive={isRecording} className="mx-auto" />
              
              <h3 className="text-2xl font-medium">Voice Assistant</h3>
              <p className="text-muted-foreground">
                In the full version, I can process voice commands in multiple languages 
                including English, Hindi, Gujarati, Japanese, Russian, Korean, Chinese, 
                French, and Spanish.
              </p>
              
              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={toggleRecording}
                  className={`${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
                >
                  <Mic size={18} className="mr-2" />
                  {isRecording ? 'Listening...' : 'Start Speaking'}
                </Button>
                
                <Button size="lg" variant="outline">
                  <Volume2 size={18} className="mr-2" />
                  Text to Speech
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="multilingual" className="flex-1 p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-medium mb-2">Multilingual Support</h3>
              <p className="text-muted-foreground">
                A.I.S.H.A. can understand and respond in multiple languages.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { lang: 'English', sample: 'How can I help you today?' },
                { lang: 'Hindi', sample: 'मैं आज आपकी कैसे मदद कर सकती हूँ?' },
                { lang: 'Spanish', sample: '¿Cómo puedo ayudarte hoy?' },
                { lang: 'French', sample: 'Comment puis-je vous aider aujourd\'hui?' },
                { lang: 'Japanese', sample: '今日はどのようにお手伝いできますか？' },
                { lang: 'Chinese', sample: '今天我能帮您什么忙？' },
                { lang: 'Russian', sample: 'Чем я могу вам помочь сегодня?' },
                { lang: 'Korean', sample: '오늘 어떻게 도와 드릴까요?' }
              ].map((item, index) => (
                <div key={index} className="bg-secondary rounded-lg p-4">
                  <h4 className="font-medium">{item.lang}</h4>
                  <p className="text-sm opacity-90">{item.sample}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AssistantMode;
