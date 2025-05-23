
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
  
  // Dynamic milestone spacing logic with increased minimum spacing
  const MIN_SPACING = 6; // Increased from 4% to 6%
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

  // Helper function to determine milestone color based on state
  const getMilestoneStyle = (value: number, isTarget: boolean, isUnlocked: boolean) => {
    if (isTarget) {
      return {
        bgColor: 'bg-commission-dark',
        textColor: 'text-commission-dark'
      };
    }
    
    if (value < targetGrowthPercentage) {
      return {
        bgColor: 'bg-status-danger',
        textColor: 'text-status-danger'
      };
    }
    
    if (isUnlocked) {
      return {
        bgColor: 'bg-status-success',
        textColor: 'text-status-success'
      };
    }
    
    return {
      bgColor: 'bg-gray-400',
      textColor: 'text-gray-600'
    };
  };

  // Determine if we need to show zero separately
  const showZeroSeparately = 
    growthPercentage > -10 &&
    zeroPosition > 0 &&
    !shouldShowNegative &&
    growthPercentage < targetGrowthPercentage;

  // Milestone label component for consistent styling
  const MilestoneLabel = ({ 
    value, 
    textColorClass, 
    reward = null 
  }: { 
    value: number, 
    textColorClass: string, 
    reward?: number | null 
  }) => (
    <div className="absolute bottom-[-2.5rem] -translate-x-1/2 text-center whitespace-nowrap">
      <div className={`text-xs font-medium ${textColorClass}`}>
        {value}%
      </div>
      {reward !== null && (
        <div className="text-xs">
          +{currency}{formatCurrency(reward)}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative h-12 bg-gray-100 rounded-full overflow-visible shadow-inner">
      {/* Progress bar fill */}
      <div 
        className={`h-full ${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'}`}
        style={{ width: `${Math.max(0, currentPosition)}%` }}
      ></div>
      
      {/* Negative milestone markers */}
      {negativeMilestones.map(value => {
        const { bgColor, textColor } = getMilestoneStyle(value, false, false);
        return (
          <div 
            key={`neg-${value}`}
            className={`absolute top-0 h-full w-0.5 ${bgColor}`}
            style={{ left: `${calculatePosition(value)}%` }}
          >
            <MilestoneLabel value={value} textColorClass={textColor} />
          </div>
        );
      })}

      {/* Zero marker - only show if it makes sense in the context */}
      {showZeroSeparately && (
        <div 
          className="absolute top-0 h-full w-0.5 bg-gray-400" 
          style={{ left: `${zeroPosition}%` }}
        >
          <MilestoneLabel value={0} textColorClass="text-gray-700" />
        </div>
      )}
      
      {/* Target marker (activation point) */}
      <div 
        className="absolute top-0 h-full w-0.5 bg-commission-dark z-20"
        style={{ left: `${targetPosition}%` }}
      >
        {/* Activation Flag - Above the bar, only shown when not yet reached */}
        {growthPercentage < targetGrowthPercentage && (
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
        )}
        
        {/* Target milestone label below the bar */}
        {growthPercentage >= targetGrowthPercentage && (
          <MilestoneLabel 
            value={targetGrowthPercentage} 
            textColorClass="text-commission-dark" 
            reward={1000} 
          />
        )}
      </div>
      
      {/* Forward milestone markers - after target */}
      {forwardMilestones.map((milestone, index) => {
        const { bgColor, textColor } = getMilestoneStyle(
          milestone.value, 
          milestone.isTarget, 
          milestone.isUnlocked
        );
        
        return (
          <div 
            key={`forward-${index}`}
            className={`absolute top-0 h-full w-0.5 ${bgColor}`}
            style={{ left: `${milestone.position}%` }}
          >
            <MilestoneLabel 
              value={milestone.value} 
              textColorClass={textColor}
              reward={milestone.reward} 
            />
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
