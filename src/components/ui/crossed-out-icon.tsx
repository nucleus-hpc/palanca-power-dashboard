
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CrossedOutIconProps {
  Icon: LucideIcon;
  className?: string;
  size?: number;
  color?: string;
}

const CrossedOutIcon: React.FC<CrossedOutIconProps> = ({ 
  Icon, 
  className = "", 
  size = 20,
  color = "currentColor" 
}) => {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <Icon size={size} color={color} />
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent 45%, ${color} 47%, ${color} 53%, transparent 55%)`
        }}
      />
    </div>
  );
};

export default CrossedOutIcon;
