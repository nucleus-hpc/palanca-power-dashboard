
import React from 'react';

interface ProgressBarV3Props {
  growthPercentage: number;
  targetGrowthPercentage: number;
  hasReachedTarget: boolean;
  formatCurrency: (value: number) => string;
  currency: string;
  t: any;
  highestVisibleMilestone: number;
}

const ProgressBarV3: React.FC<ProgressBarV3Props> = ({ 
  growthPercentage, 
  targetGrowthPercentage, 
  hasReachedTarget,
  formatCurrency,
  currency,
  t,
  highestVisibleMilestone
}) => {
  // Determine which milestones to display based on current growth
  const showNegativeMilestones = growthPercentage < 0;
  
  // Set range for the progress bar visualization
  const min = showNegativeMilestones ? -50 : 0;
  const max = Math.max(targetGrowthPercentage + 5, growthPercentage + 3, highestVisibleMilestone);
  const range = max - min;
  
  // Calculate position percentage for the progress bar
  const getPosition = (value: number) => {
    return ((value - min) / range) * 100;
  };
  
  // The current growth percentage position
  const currentPosition = getPosition(growthPercentage);
  
  // Format the current growth percentage for display
  const formattedGrowth = growthPercentage.toFixed(1).replace(/\.0$/, '');
  
  return (
    <div className="relative mt-8 mb-20">
      {/* Current growth percentage indicator */}
      <div className="flex items-center justify-between mb-6">
        <span className={`text-xl font-bold ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
          {formattedGrowth}%
        </span>
        <span className="text-sm font-medium">
          {t.content.targetGrowth} ({targetGrowthPercentage}%)
        </span>
      </div>
      
      {/* Progress bar container */}
      <div className="relative h-12 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
        {/* Progress fill */}
        <div className={`absolute h-full transition-all duration-500 ease-out ${
          hasReachedTarget 
            ? 'bg-gradient-to-r from-status-success/30 to-status-success/50 border-r-4 border-status-success'
            : 'bg-gradient-to-r from-status-danger/30 to-status-danger/50 border-r-4 border-status-danger'
          }`}
          style={{ width: `${currentPosition}%` }}
        />
        
        {/* Zero milestone */}
        <div className="absolute bottom-0 top-0 w-0.5 bg-gray-400"
          style={{ left: `${getPosition(0)}%` }}>
          <div className="absolute -bottom-6 -translate-x-1/2 bg-status-neutral px-2 py-0.5 rounded text-white text-xs">
            0%
          </div>
        </div>
        
        {/* Negative milestones - only show if relevant */}
        {showNegativeMilestones && 
          [-50, -40, -30, -20, -10].map(value => (
            <div 
              key={`neg-${value}`}
              className="absolute bottom-0 top-0 w-0.5 bg-gray-300"
              style={{ left: `${getPosition(value)}%` }}
            >
              <div className="absolute -bottom-6 -translate-x-1/2 text-[10px] text-status-danger">
                {value}%
              </div>
            </div>
          ))
        }
        
        {/* Target milestone (13%) with activation point label */}
        <div className="absolute bottom-0 top-0 w-0.5 bg-sidebar-accent"
          style={{ left: `${getPosition(targetGrowthPercentage)}%` }}>
          <div className="absolute -top-16 -translate-x-1/2 flex flex-col items-center">
            <div className="bg-sidebar-accent text-white px-2 py-1 rounded-t-md text-xs">
              Punto de Activación
            </div>
            <div className="bg-sidebar-accent text-white p-2 rounded-b-md shadow-lg min-w-[80px]">
              <div className="text-xs font-bold text-center">{targetGrowthPercentage}%</div>
              <div className="text-xs text-center">+{currency}{formatCurrency(1000)}</div>
            </div>
            <div className="h-4 w-0.5 bg-sidebar-accent"></div>
          </div>
        </div>
        
        {/* Additional milestones after target */}
        {Array.from({ length: 5 }, (_, i) => targetGrowthPercentage + i + 1)
          .filter(value => value <= highestVisibleMilestone)
          .slice(0, 4)  // Limit to 4 forward milestones max
          .map(value => (
            <div 
              key={`add-${value}`}
              className={`absolute bottom-0 top-0 w-0.5 ${growthPercentage >= value ? 'bg-status-success' : 'bg-gray-400'}`}
              style={{ left: `${getPosition(value)}%` }}
            >
              <div className="absolute -top-10 -translate-x-1/2 flex flex-col items-center">
                <div className={`bg-gray-300 p-2 rounded-md shadow-md min-w-[80px]`}>
                  <div className="text-xs font-bold text-center">{value}%</div>
                  <div className="text-xs text-center">+{currency}{formatCurrency(250 * (value - targetGrowthPercentage))}</div>
                </div>
                <div className={`h-4 w-0.5 ${growthPercentage >= value ? 'bg-status-success' : 'bg-gray-400'}`}></div>
              </div>
            </div>
          ))
        }
        
        {/* Current position indicator */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 z-10"
          style={{ left: `${currentPosition}%` }}
        >
          <div className={`w-6 h-6 rounded-full shadow-lg ${
            hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'
          } transform -translate-x-1/2 border-2 border-white flex items-center justify-center`}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarV3;
