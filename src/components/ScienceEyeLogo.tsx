import React from 'react';

const ScienceEyeLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer eye shape */}
        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="25"
          fill="none"
          stroke="hsl(var(--quantum-glow))"
          strokeWidth="2"
          className="animate-pulse-glow"
        />
        
        {/* Iris */}
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="url(#cosmicGradient)"
          className="animate-pulse"
        />
        
        {/* Pupil with stars */}
        <circle
          cx="50"
          cy="50"
          r="12"
          fill="hsl(var(--background))"
        />
        
        {/* Stars in pupil */}
        <g className="animate-rotate-slow">
          <circle cx="50" cy="45" r="1" fill="hsl(var(--quantum-glow))" className="animate-pulse" />
          <circle cx="55" cy="52" r="0.8" fill="hsl(var(--molecule-blue))" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="45" cy="53" r="1.2" fill="hsl(var(--neuron-green))" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="52" cy="47" r="0.6" fill="hsl(var(--star-gold))" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
        </g>
        
        {/* Light reflection */}
        <ellipse
          cx="45"
          cy="45"
          rx="4"
          ry="6"
          fill="hsl(var(--foreground))"
          opacity="0.3"
        />
        
        {/* Gradient definitions */}
        <defs>
          <radialGradient id="cosmicGradient" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="hsl(var(--quantum-glow))" />
            <stop offset="50%" stopColor="hsl(var(--cosmic-purple))" />
            <stop offset="100%" stopColor="hsl(var(--molecule-blue))" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ScienceEyeLogo;