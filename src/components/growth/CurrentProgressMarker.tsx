
import React from 'react';

interface CurrentProgressMarkerProps {
  position: number;
  growthValue: string;
  hasReachedTarget: boolean;
}

const CurrentProgressMarker: React.FC<CurrentProgressMarkerProps> = ({ 
  position, 
  growthValue, 
  hasReachedTarget 
}) => (
  <div 
    className="absolute top-0 h-full z-30"
    style={{ left: `${position}%` }}
  >
    <div className={`h-full w-2 ${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'}`}></div>
    <div className="absolute -top-8 -translate-x-1/2 bg-white px-3 py-1.5 rounded-md shadow-md border border-gray-200 font-bold text-sm">
      {growthValue}%
    </div>
  </div>
);

export default CurrentProgressMarker;
