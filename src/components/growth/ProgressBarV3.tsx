
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
  // Format the growth percentage for display
  const formattedGrowth = growthPercentage.toFixed(1).replace(/\.0$/, '');
  
  // Set range for the progress bar visualization
  const min = growthPercentage < 0 ? -50 : 0;
  const max = Math.max(targetGrowthPercentage + 5, growthPercentage + 3, highestVisibleMilestone);
  const range = max - min;
  
  // Calculate position percentage for the progress bar
  const getPosition = (value: number) => {
    return ((value - min) / range) * 100;
  };
  
  // Get positions for key points
  const zeroPosition = getPosition(0);
  const currentPosition = getPosition(growthPercentage);
  const targetPosition = getPosition(targetGrowthPercentage);
  
  // Determine which milestones to show
  const shouldShowNegative = growthPercentage < 0;
  
  // Generate forward milestones
  const forwardMilestones = [];
  const maxMilestones = 3; // Show max 3 forward milestones
  
  for (let i = 1; i <= maxMilestones; i++) {
    const milestoneValue = targetGrowthPercentage + i;
    if (milestoneValue <= highestVisibleMilestone) {
      forwardMilestones.push({
        value: milestoneValue,
        position: getPosition(milestoneValue),
        reward: 250 * i,
        isUnlocked: growthPercentage >= milestoneValue
      });
    }
  }
  
  return (
    <div className="relative mt-8 mb-24">
      {/* Current growth percentage indicator and target */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`text-xl font-bold ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
            {formattedGrowth}%
          </div>
          <div className="ml-2 text-sm text-muted-foreground">crecimiento actual</div>
        </div>
        <div className="flex items-center">
          <div className="text-sm font-medium">{targetGrowthPercentage}%</div>
          <div className="ml-1 text-sm text-muted-foreground">punto de activación</div>
        </div>
      </div>
      
      {/* Progress bar track */}
      <div className="relative h-4 rounded-full bg-gray-200 overflow-hidden shadow-inner mb-10">
        {/* Fill gradient */}
        <div 
          className={`absolute h-full transition-all duration-500 ease-out 
            ${hasReachedTarget 
              ? 'bg-gradient-to-r from-status-success/70 to-status-success' 
              : 'bg-gradient-to-r from-status-danger/70 to-status-danger'}`}
          style={{ width: `${currentPosition}%` }}
        ></div>
        
        {/* Zero milestone */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-gray-600 z-10" 
          style={{ left: `${zeroPosition}%` }}
        >
          <div className="absolute bottom-0 h-6 w-0.5 bg-gray-600"></div>
          <div className="absolute bottom-8 -translate-x-1/2 flex flex-col items-center">
            <div className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
              0%
            </div>
          </div>
        </div>
        
        {/* Negative milestones */}
        {shouldShowNegative && [-50, -40, -30, -20, -10].map(value => (
          <div 
            key={`neg-${value}`}
            className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10" 
            style={{ left: `${getPosition(value)}%` }}
          >
            <div className="absolute bottom-0 h-4 w-0.5 bg-gray-400"></div>
            <div className="absolute bottom-8 -translate-x-1/2 text-xs text-status-danger">
              {value}%
            </div>
          </div>
        ))}
        
        {/* Target milestone (13%) with activation point label */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-sidebar-accent z-10" 
          style={{ left: `${targetPosition}%` }}
        >
          <div className="absolute bottom-0 h-6 w-0.5 bg-sidebar-accent"></div>
          <div className="absolute bottom-8 -translate-x-1/2 flex flex-col items-center">
            <div className="bg-sidebar-accent text-white px-2 py-1 rounded-t-md text-xs">
              Punto de Activación
            </div>
            <div className="bg-sidebar-accent text-white p-2 rounded-b-md shadow-md min-w-[80px] text-center">
              <div className="font-bold">{targetGrowthPercentage}%</div>
              <div className="text-xs">+{currency}{formatCurrency(1000)}</div>
            </div>
          </div>
        </div>
        
        {/* Forward milestones */}
        {forwardMilestones.map((milestone, index) => (
          <div 
            key={`forward-${index}`}
            className={`absolute top-0 bottom-0 w-0.5 z-10 ${milestone.isUnlocked ? 'bg-status-success' : 'bg-gray-500'}`} 
            style={{ left: `${milestone.position}%` }}
          >
            <div className="absolute bottom-0 h-4 w-0.5 bg-inherit"></div>
            <div className="absolute bottom-8 -translate-x-1/2 flex flex-col items-center">
              <div className={`${milestone.isUnlocked ? 'bg-status-success' : 'bg-gray-500'} text-white p-1.5 rounded-md shadow-md text-center min-w-[70px]`}>
                <div className="font-bold">{milestone.value}%</div>
                <div className="text-xs">+{currency}{formatCurrency(milestone.reward)}</div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Current position indicator */}
        <div 
          className="absolute top-1/2 z-20" 
          style={{ left: `${currentPosition}%` }}
        >
          <div className={`transform -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full ${
            hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'} border-2 border-white shadow-md`}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarV3;
