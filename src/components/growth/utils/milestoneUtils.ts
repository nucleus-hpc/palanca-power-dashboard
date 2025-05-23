
/**
 * Utility functions for milestone calculations and styling
 */

/**
 * Determines the styling classes for a milestone based on its state
 */
export const getMilestoneStyle = (
  value: number, 
  isTarget: boolean, 
  isUnlocked: boolean,
  targetGrowthPercentage: number
) => {
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

/**
 * Calculates the milestone positions to display based on current growth
 */
export const calculateMilestones = (
  growthPercentage: number,
  targetGrowthPercentage: number,
  lowestVisibleMilestone: number,
  highestVisibleMilestone: number,
  calculatePosition: (value: number) => number
) => {
  const MIN_SPACING = 6; // Minimum spacing between milestones
  const shouldShowNegative = growthPercentage < 0;
  const remainingSpace = highestVisibleMilestone - Math.ceil(growthPercentage);
  const dynamicMilestoneLimit = Math.min(3, Math.floor(remainingSpace / MIN_SPACING));
  
  // Generate negative milestone markers if growth is negative
  const negativeMilestones = shouldShowNegative 
    ? [-50, -40, -30, -20, -10].filter(value => 
        value >= lowestVisibleMilestone && 
        calculatePosition(value) <= calculatePosition(Math.min(0, growthPercentage + 10)))
    : [];
  
  // Generate forward milestones
  const forwardMilestones = [];

  if (growthPercentage < targetGrowthPercentage) {
    // Show milestones at and after the target activation point
    const milestonesToShow = Math.min(3, dynamicMilestoneLimit + 1);
    
    for (let i = 0; i < milestonesToShow; i++) {
      const milestoneValue = targetGrowthPercentage + i;
      if (milestoneValue <= highestVisibleMilestone) {
        forwardMilestones.push({
          value: milestoneValue,
          position: calculatePosition(milestoneValue),
          reward: i === 0 ? 1000 : 250 * i,
          isUnlocked: growthPercentage >= milestoneValue,
          isTarget: i === 0
        });
      }
    }
  } else {
    // Show milestones after current position
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
  
  // Determine if we need to show zero separately
  const zeroPosition = calculatePosition(0);
  const showZeroSeparately = 
    growthPercentage > -10 &&
    zeroPosition > 0 &&
    !shouldShowNegative &&
    growthPercentage < targetGrowthPercentage;
    
  return {
    negativeMilestones,
    forwardMilestones,
    showZeroSeparately,
    zeroPosition
  };
};
