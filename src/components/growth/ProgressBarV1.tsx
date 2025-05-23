
import React from 'react';

interface ProgressBarV1Props {
  growthPercentage: number;
  targetGrowthPercentage: number;
  hasReachedTarget: boolean;
  lowestVisibleMilestone: number;
  highestVisibleMilestone: number;
  calculatePosition: (value: number) => number;
  formatCurrency: (value: number) => string;
  currency: string;
}

const ProgressBarV1: React.FC<ProgressBarV1Props> = ({
  growthPercentage,
  targetGrowthPercentage,
  hasReachedTarget,
  lowestVisibleMilestone,
  highestVisibleMilestone,
  calculatePosition,
  formatCurrency,
  currency
}) => {
  // Format the growth percentage for display
  const formattedGrowth = growthPercentage.toFixed(1).replace(/\.0$/, '');
  
  // Calculate positions
  const zeroPosition = calculatePosition(0);
  const targetPosition = calculatePosition(targetGrowthPercentage);
  const currentPosition = calculatePosition(growthPercentage);
  
  // Determine milestones to display based on current growth
  const shouldShowNegative = growthPercentage < 0;
  
  // Dynamic milestone spacing logic
  const MIN_SPACING = 4; // Minimum 4% spacing between milestones
  const remainingSpace = highestVisibleMilestone - Math.ceil(growthPercentage);
  const dynamicMilestoneLimit = Math.min(3, Math.floor(remainingSpace / MIN_SPACING));
  
  // Generate milestone markers based on growth relative to target
  const forwardMilestones = [];

  if (growthPercentage < targetGrowthPercentage) {
    // Show milestones at and after the target activation point, limited by dynamic constraints
    const milestonesToShow = Math.min(3, dynamicMilestoneLimit + 1); // Include activation point in space calculation
    
    for (let i = 0; i < milestonesToShow; i++) {
      const milestoneValue = targetGrowthPercentage + i;
      if (milestoneValue <= highestVisibleMilestone) {
        forwardMilestones.push({
          value: milestoneValue,
          position: calculatePosition(milestoneValue),
          reward: i === 0 ? 1000 : 250 * i,
          isUnlocked: growthPercentage >= milestoneValue
        });
      }
    }
  } else {
    // Show milestones after current position, limited by dynamic constraints
    for (let i = 1; i <= dynamicMilestoneLimit; i++) {
      const milestoneValue = targetGrowthPercentage + i;
      if (milestoneValue <= highestVisibleMilestone) {
        forwardMilestones.push({
          value: milestoneValue,
          position: calculatePosition(milestoneValue),
          reward: 250 * i,
          isUnlocked: growthPercentage >= milestoneValue
        });
      }
    }
  }

  return (
    <div className="relative h-12 bg-gray-100 rounded-full overflow-visible mb-32 mt-32 shadow-inner">
      {/* Progress bar fill */}
      <div 
        className={`h-full ${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'}`}
        style={{ width: `${Math.max(0, currentPosition)}%` }}
      ></div>
      
      {/* Zero marker */}
      <div className="absolute top-0 h-full w-0.5 bg-gray-400" style={{ left: `${zeroPosition}%` }}>
        <div className="absolute -bottom-8 -translate-x-1/2 bg-gray-700 text-white px-2 py-0.5 rounded-sm text-xs">
          0%
        </div>
      </div>
      
      {/* Negative markers - only show if below zero */}
      {shouldShowNegative && [-50, -40, -30, -20, -10].map(value => (
        <div 
          key={`neg-${value}`}
          className="absolute top-0 h-full w-0.5 bg-gray-300"
          style={{ left: `${calculatePosition(value)}%` }}
        >
          <div className="absolute -bottom-8 -translate-x-1/2 text-xs text-status-danger font-medium">
            {value}%
          </div>
        </div>
      ))}
      
      {/* Target marker (13%) - Always visible as activation point */}
      <div 
        className="absolute top-0 h-full w-0.5 bg-sidebar-accent z-20"
        style={{ left: `${targetPosition}%` }}
      >
        <div className="absolute -top-28 -translate-x-1/2 flex flex-col items-center z-40 pointer-events-none">
          <div className="bg-sidebar-accent text-white px-2 py-1 rounded-t-md text-xs whitespace-nowrap">
            Punto de Activación
          </div>
          <div className="bg-sidebar-accent text-white p-2 rounded-b-md shadow-md text-center">
            <div className="font-bold text-sm">{targetGrowthPercentage}%</div>
            <div className="text-xs">+{currency}{formatCurrency(1000)}</div>
          </div>
          <div className="h-10 w-0.5 bg-sidebar-accent"></div>
        </div>
      </div>
      
      {/* Forward milestone markers - after target */}
      {forwardMilestones.map((milestone, index) => (
        <div 
          key={`forward-${index}`}
          className={`absolute top-0 h-full w-0.5 ${milestone.isUnlocked ? 'bg-status-success' : 'bg-gray-400'}`}
          style={{ left: `${milestone.position}%` }}
        >
          <div className="absolute -top-20 -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none">
            <div className={`${milestone.isUnlocked ? 'bg-status-success/80' : 'bg-gray-200'} p-2 rounded-md shadow-md text-center min-w-[70px]`}>
              <div className="font-bold text-sm">{milestone.value}%</div>
              <div className="text-xs">+{currency}{formatCurrency(milestone.reward)}</div>
            </div>
            <div className="h-8 w-0.5 bg-gray-300"></div>
          </div>
        </div>
      ))}
      
      {/* Current position marker */}
      <div 
        className="absolute top-0 h-full z-30"
        style={{ left: `${currentPosition}%` }}
      >
        <div className={`h-full w-2 ${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'}`}></div>
        <div className="absolute -top-8 -translate-x-1/2 bg-white px-3 py-1.5 rounded-md shadow-md border border-gray-200 font-bold text-sm">
          {formattedGrowth}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBarV1;
