
import React from 'react';

interface VoiceWaveformProps {
  isActive?: boolean;
  className?: string;
}

const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ 
  isActive = false,
  className = ""
}) => {
  return (
    <div className={`voice-wave ${isActive ? 'opacity-100' : 'opacity-40'} ${className}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default VoiceWaveform;
