
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
  // Format the growth percentage for display
  const formattedGrowth = growthPercentage.toFixed(1).replace(/\.0$/, '');
  
  // Set range for the progress bar visualization
  const min = growthPercentage < 0 ? -50 : 0;
  const max = Math.max(targetGrowthPercentage + 5, highestVisibleMilestone, growthPercentage + 3);
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
      {/* Label and current value display at top */}
      <div className="flex items-center justify-between mb-4">
        <div className={`text-xl font-bold ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
          {formattedGrowth}%
        </div>
        <div className="text-sm font-medium">
          Meta: {targetGrowthPercentage}%
        </div>
      </div>
      
      {/* Main progress track */}
      <div className="relative h-10 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
        {/* Fill bar */}
        <div 
          className={`absolute h-full ${hasReachedTarget ? 'bg-status-success/70' : 'bg-status-danger/70'}`} 
          style={{ width: `${currentPosition}%` }}
        ></div>
        
        {/* Zero marker */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10" 
          style={{ left: `${zeroPosition}%` }}
        >
          <div className="absolute -bottom-7 -translate-x-1/2 bg-gray-700 px-2 py-0.5 rounded text-white text-xs">
            0%
          </div>
        </div>
        
        {/* Negative milestone markers */}
        {shouldShowNegative && [-50, -40, -30, -20, -10].map(value => (
          <div 
            key={`neg-${value}`}
            className="absolute top-0 bottom-0 w-0.5 bg-gray-300 z-10" 
            style={{ left: `${getPosition(value)}%` }}
          >
            <div className="absolute -bottom-7 -translate-x-1/2 text-xs text-status-danger">
              {value}%
            </div>
          </div>
        ))}
        
        {/* Target milestone marker (13%) */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-sidebar-accent z-10" 
          style={{ left: `${targetPosition}%` }}
        >
          <div className="absolute -top-24 -translate-x-1/2 flex flex-col items-center">
            <div className="bg-sidebar-accent text-white px-2 py-1 rounded-t-md text-xs">
              Punto de Activación
            </div>
            <div className="bg-sidebar-accent text-white p-2 rounded-b-md shadow-md min-w-[80px] text-center">
              <div className="font-bold text-sm">{targetGrowthPercentage}%</div>
              <div className="text-xs">+{currency}{formatCurrency(1000)}</div>
            </div>
            <div className="h-8 w-0.5 bg-sidebar-accent"></div>
          </div>
        </div>
        
        {/* Forward milestone markers */}
        {forwardMilestones.map((milestone, index) => (
          <div 
            key={`forward-${index}`}
            className={`absolute top-0 bottom-0 w-0.5 z-10 ${milestone.isUnlocked ? 'bg-status-success' : 'bg-gray-400'}`} 
            style={{ left: `${milestone.position}%` }}
          >
            <div className="absolute -top-16 -translate-x-1/2 flex flex-col items-center">
              <div className={`${milestone.isUnlocked ? 'bg-status-success/10' : 'bg-gray-200'} p-2 rounded-md shadow-md text-center min-w-[70px]`}>
                <div className="font-bold text-sm">{milestone.value}%</div>
                <div className="text-xs">+{currency}{formatCurrency(milestone.reward)}</div>
              </div>
              <div className="h-8 w-0.5 bg-gray-300"></div>
            </div>
          </div>
        ))}
        
        {/* Current position indicator */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 z-20"
          style={{ left: `${currentPosition}%` }}
        >
          <div className={`w-6 h-6 rounded-full ${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'} shadow-md transform -translate-x-1/2 border-2 border-white`}></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarV2;
