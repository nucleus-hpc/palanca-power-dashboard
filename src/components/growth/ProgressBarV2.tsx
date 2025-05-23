
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
  // Determine which milestones to display based on current growth
  const showNegativeMilestones = growthPercentage < 0;
  
  // Calculate relative positions on the progress bar
  const getRelativePosition = (value: number) => {
    const min = -50;
    const max = Math.max(highestVisibleMilestone, targetGrowthPercentage + 5);
    return ((value - min) / (max - min)) * 100;
  };
  
  return (
    <div className="relative rounded-lg overflow-hidden mb-24 mt-12">
      {/* Progress track background */}
      <div className="h-6 bg-gray-200 rounded-full relative">
        {/* Fill color based on progress */}
        <div 
          className={`absolute h-full left-0 ${
            hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'
          }`} 
          style={{ width: `${getRelativePosition(growthPercentage)}%` }}
        ></div>
        
        {/* Current position indicator */}
        <div 
          className="absolute top-0 bottom-0 z-10"
          style={{ left: `${getRelativePosition(growthPercentage)}%` }}
        >
          <div className={`w-4 h-full ${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'}`}></div>
          <div className="absolute -top-8 -translate-x-1/2 bg-white px-3 py-1 rounded-md shadow-md border border-gray-200 font-bold">
            {growthPercentage}%
          </div>
        </div>
        
        {/* Zero marker */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-gray-400" style={{ left: `${getRelativePosition(0)}%` }}>
          <div className="absolute -bottom-7 -translate-x-1/2 bg-status-neutral px-2 py-1 rounded text-white text-xs">
            0%
          </div>
        </div>
        
        {/* Negative markers */}
        {showNegativeMilestones && [-50, -40, -30, -20, -10].map(value => (
          <div 
            key={`negative-${value}`} 
            className="absolute top-0 bottom-0 w-0.5 bg-gray-300" 
            style={{ left: `${getRelativePosition(value)}%` }}
          >
            <div className="absolute -bottom-7 -translate-x-1/2 text-xs text-status-danger font-medium">
              {value}%
            </div>
          </div>
        ))}
        
        {/* Target marker (13%) with activation point label */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-sidebar-accent" style={{ left: `${getRelativePosition(targetGrowthPercentage)}%` }}>
          <div className="absolute -top-16 -translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="bg-sidebar-accent text-white px-2 py-1 rounded-t-md text-xs">
                Punto de Activación
              </div>
              <div className="bg-sidebar-accent text-white p-2 rounded-b-md shadow-md">
                <div className="text-center">
                  <span className="font-bold">{targetGrowthPercentage}%</span>
                  <br />
                  <span>+{currency}{formatCurrency(1000)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional milestones after target */}
        {Array.from({ length: 5 }, (_, i) => targetGrowthPercentage + i + 1)
          .filter(value => value <= highestVisibleMilestone)
          .slice(0, 4)  // Limit to 4 forward milestones max
          .map(value => (
            <div 
              key={`additional-${value}`}
              className={`absolute top-0 bottom-0 w-0.5 ${growthPercentage >= value ? 'bg-status-success' : 'bg-gray-400'}`}
              style={{ left: `${getRelativePosition(value)}%` }}
            >
              <div className={`absolute -top-16 -translate-x-1/2`}>
                <div className="bg-gray-300 p-2 rounded-md shadow-md">
                  <div className="text-center text-xs">
                    <span className="font-bold">{value}%</span>
                    <br />
                    <span>+{currency}{formatCurrency(250 * (value - targetGrowthPercentage))}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ProgressBarV2;
