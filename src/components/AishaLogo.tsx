
import React from 'react';

interface AishaLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const AishaLogo: React.FC<AishaLogoProps> = ({ 
  size = 48, 
  animated = true,
  className = "" 
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div 
        className={`rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 
                    flex items-center justify-center 
                    ${animated ? 'animate-pulse' : ''}`}
        style={{ width: size, height: size }}
      >
        <div 
          className="rounded-full bg-white/90 flex items-center justify-center"
          style={{ width: size * 0.8, height: size * 0.8 }}
        >
          <div 
            className={`rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center
                       ${animated ? 'animate-rotate' : ''}`}
            style={{ width: size * 0.6, height: size * 0.6 }}
          >
            <div className="text-white font-bold" style={{ fontSize: size * 0.3 }}>
              AI
            </div>
          </div>
        </div>
      </div>
      
      {/* Orbiting dots */}
      {animated && (
        <>
          <div 
            className="absolute rounded-full bg-purple-400 animate-rotate"
            style={{ 
              width: size * 0.1, 
              height: size * 0.1, 
              transformOrigin: 'center',
              animation: 'rotate 8s linear infinite',
              top: 0,
              left: '45%'
            }}
          />
          <div 
            className="absolute rounded-full bg-indigo-400 animate-rotate"
            style={{ 
              width: size * 0.1, 
              height: size * 0.1, 
              transformOrigin: 'center',
              animation: 'rotate 12s linear infinite reverse',
              bottom: 0,
              right: '45%'
            }}
          />
        </>
      )}
    </div>
  );
};

export default AishaLogo;
