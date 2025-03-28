
import React, { useEffect, useState } from 'react';

interface VoiceWaveformProps {
  isActive?: boolean;
  className?: string;
  intensity?: number; // 0-100 value representing microphone input level
}

const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ 
  isActive = false,
  className = "",
  intensity = 50 // Default intensity when active
}) => {
  const [bars, setBars] = useState<number[]>([]);
  
  // Generate random heights for the waveform bars
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Create an array of random heights based on intensity
        const barCount = 5;
        const newBars = Array.from({ length: barCount }, () => {
          // Base height plus random variance based on intensity
          const baseHeight = intensity / 2;
          const variance = intensity / 2;
          return baseHeight + Math.random() * variance;
        });
        setBars(newBars);
      }, 150); // Update every 150ms for a natural feel
      
      return () => clearInterval(interval);
    } else {
      // When inactive, set low static heights
      setBars([15, 10, 20, 10, 15]);
    }
  }, [isActive, intensity]);

  return (
    <div className={`voice-wave flex items-end justify-center h-16 space-x-1 ${isActive ? 'opacity-100' : 'opacity-40'} ${className}`}>
      {bars.map((height, index) => (
        <span 
          key={index}
          className={`block w-2 bg-primary rounded-full transition-all duration-150 ease-in-out ${isActive ? 'bg-opacity-100' : 'bg-opacity-60'}`}
          style={{ 
            height: `${height}%`,
            maxHeight: '100%'
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;
