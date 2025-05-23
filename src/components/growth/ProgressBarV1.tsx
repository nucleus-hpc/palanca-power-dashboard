
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

  // Generate negative milestone markers if growth is negative
  const negativeMilestones = shouldShowNegative 
    ? [-50, -40, -30, -20, -10].filter(value => 
        value >= lowestVisibleMilestone && 
        calculatePosition(value) <= calculatePosition(Math.min(0, growthPercentage + 10)))
    : [];
  
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
          isUnlocked: growthPercentage >= milestoneValue,
          isTarget: i === 0 // Flag to identify the target milestone
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
          isUnlocked: growthPercentage >= milestoneValue,
          isTarget: false
        });
      }
    }
  }

  // Determine if we need to show zero separately (when it's not already in the negative milestones)
  const showZeroSeparately = zeroPosition > 0 && 
    (!shouldShowNegative || !negativeMilestones.includes(0)) && 
    growthPercentage > -10;

  return (
    <div className="relative h-12 bg-gray-100 rounded-full overflow-visible shadow-inner">
      {/* Progress bar fill */}
      <div 
        className={`h-full ${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'}`}
        style={{ width: `${Math.max(0, currentPosition)}%` }}
      ></div>
      
      {/* Negative milestone markers */}
      {negativeMilestones.map(value => (
        <div 
          key={`neg-${value}`}
          className="absolute top-0 h-full w-0.5 bg-status-danger"
          style={{ left: `${calculatePosition(value)}%` }}
        >
          <div className="absolute bottom-[-2.5rem] -translate-x-1/2 text-center">
            <div className="text-xs font-medium text-status-danger">
              {value}%
            </div>
            <div className="text-xs">
              &nbsp;
            </div>
          </div>
        </div>
      ))}

      {/* Zero marker - only show if it makes sense in the context */}
      {showZeroSeparately && (
        <div 
          className="absolute top-0 h-full w-0.5 bg-gray-400" 
          style={{ left: `${zeroPosition}%` }}
        >
          <div className="absolute bottom-[-2.5rem] -translate-x-1/2 text-center">
            <div className="text-xs font-medium text-gray-700">
              0%
            </div>
            <div className="text-xs">
              &nbsp;
            </div>
          </div>
        </div>
      )}
      
      {/* Target marker (activation point) */}
      <div 
        className="absolute top-0 h-full w-0.5 bg-commission-dark z-20"
        style={{ left: `${targetPosition}%` }}
      >
        {/* Activation Flag - Above the bar */}
        <div className="absolute top-[-4.5rem] -translate-x-1/2 flex flex-col items-center z-40 pointer-events-none">
          <div className="bg-commission-dark text-white px-2 py-1 rounded-t-md text-xs whitespace-nowrap">
            Punto de Activación
          </div>
          <div className="bg-commission-dark text-white p-2 rounded-b-md shadow-md text-center">
            <div className="font-bold text-sm">{targetGrowthPercentage}%</div>
            <div className="text-xs">+{currency}{formatCurrency(1000)}</div>
          </div>
          <div className="h-10 w-0.5 bg-commission-dark"></div>
        </div>
        
        {/* Only show the label below if we don't have a milestone for the target */}
        {!forwardMilestones.some(m => m.isTarget) && (
          <div className="absolute bottom-[-2.5rem] -translate-x-1/2 text-center">
            <div className="text-xs font-medium text-commission-dark">
              {targetGrowthPercentage}%
            </div>
            <div className="text-xs">
              +{currency}{formatCurrency(1000)}
            </div>
          </div>
        )}
      </div>
      
      {/* Forward milestone markers - after target */}
      {forwardMilestones.map((milestone, index) => {
        // Determine color based on milestone state
        let milestoneColor = milestone.isTarget ? 'bg-commission-dark' : 
                            (milestone.isUnlocked ? 'bg-status-success' : 'bg-gray-400');
        
        // Text color for the labels
        let textColor = milestone.isTarget ? 'text-commission-dark' : 
                      (milestone.isUnlocked ? 'text-status-success' : 'text-gray-600');
                      
        return (
          <div 
            key={`forward-${index}`}
            className={`absolute top-0 h-full w-0.5 ${milestoneColor}`}
            style={{ left: `${milestone.position}%` }}
          >
            <div className="absolute bottom-[-2.5rem] -translate-x-1/2 text-center">
              <div className={`text-xs font-medium ${textColor}`}>
                {milestone.value}%
              </div>
              <div className="text-xs">
                +{currency}{formatCurrency(milestone.reward)}
              </div>
            </div>
          </div>
        );
      })}
      
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
