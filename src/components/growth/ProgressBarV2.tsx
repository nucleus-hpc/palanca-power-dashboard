
import React from 'react';

interface ProgressBarV2Props {
  growthPercentage: number;
  targetGrowthPercentage: number;
  hasReachedTarget: boolean;
  highestVisibleMilestone: number;
  formatCurrency: (value: number) => string;
  currency: string;
}

const ProgressBarV2: React.FC<ProgressBarV2Props> = ({
  growthPercentage,
  targetGrowthPercentage,
  hasReachedTarget,
  highestVisibleMilestone,
  formatCurrency,
  currency
}) => {
  return (
    <div className="relative rounded-lg overflow-hidden mb-24 mt-12 bg-gray-100 h-2">
      {/* Base progress track */}
      <div className={`absolute top-0 left-0 h-full ${
        growthPercentage < 0 ? 'bg-status-danger' : 
        hasReachedTarget ? 'bg-status-success' : 'bg-commission-primary'
      }`} style={{ width: `${Math.max(0, (growthPercentage + 50) / (highestVisibleMilestone + 50) * 100)}%` }}></div>
      
      {/* Milestone markers */}
      <div className="absolute w-full h-full">
        {/* Zero marker */}
        <div className="absolute top-0 h-8 w-1 bg-gray-400" style={{ left: `${(0 + 50) / (highestVisibleMilestone + 50) * 100}%` }}>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
            <span className="text-xs font-bold">0%</span>
          </div>
        </div>
        
        {/* Target marker (13%) */}
        <div className="absolute top-0 h-8 w-1 bg-commission-dark" style={{ left: `${(targetGrowthPercentage + 50) / (highestVisibleMilestone + 50) * 100}%` }}>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md border border-commission-dark flex flex-col items-center">
            <span className="text-xs font-bold">{targetGrowthPercentage}%</span>
            <span className="text-xs">{currency}{formatCurrency(1000)}</span>
          </div>
        </div>
        
        {/* Negative markers (-50% to 0%) */}
        {[-50, -40, -30, -20, -10].map(value => (
          <div 
            key={`negative-${value}`} 
            className="absolute top-0 h-4 w-1 bg-gray-300" 
            style={{ left: `${(value + 50) / (highestVisibleMilestone + 50) * 100}%` }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="text-[10px] text-gray-500">{value}%</span>
            </div>
          </div>
        ))}
        
        {/* Additional markers after target (each 1%) */}
        {Array.from({ length: 7 }, (_, i) => targetGrowthPercentage + i + 1).map(value => (
          <div 
            key={`additional-${value}`}
            className={`absolute top-0 h-6 w-1 ${growthPercentage >= value ? 'bg-status-success' : 'bg-gray-300'}`}
            style={{ left: `${(value + 50) / (highestVisibleMilestone + 50) * 100}%` }}
          >
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md border
              ${growthPercentage >= value ? 'border-status-success' : 'border-gray-200'} flex flex-col items-center`}>
              <span className="text-xs font-bold">{value}%</span>
              <span className="text-xs">+{currency}{formatCurrency(250 * (value - targetGrowthPercentage))}</span>
            </div>
          </div>
        ))}
        
        {/* Current position indicator */}
        <div 
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${(growthPercentage + 50) / (highestVisibleMilestone + 50) * 100}%` }}
        >
          <div className={`w-5 h-5 rounded-full shadow-md ${
            hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'
          } transform -translate-x-1/2 border-2 border-white flex items-center justify-center`}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarV2;
