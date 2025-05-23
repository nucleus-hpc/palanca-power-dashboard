
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
  const MIN_SPACING = 8; // Minimum spacing between milestones
  const shouldShowNegative = growthPercentage < 0;
  
  // Generate negative milestone markers if growth is negative
  const negativeMilestones = shouldShowNegative 
    ? [-50, -40, -30, -20, -10].filter(value => {
        const position = calculatePosition(value);
        return value >= lowestVisibleMilestone && 
               position >= 5 && 
               position <= 95;
      })
    : [];
  
  // Generate forward milestones based on current scenario
  const forwardMilestones = [];

  if (growthPercentage >= targetGrowthPercentage) {
    // Scenario: Growth has reached or exceeded activation point
    // Show milestones after the current position
    const startMilestone = Math.max(targetGrowthPercentage + 1, Math.ceil(growthPercentage) + 1);
    
    for (let i = 0; i < 4; i++) {
      const milestoneValue = startMilestone + i;
      const position = calculatePosition(milestoneValue);
      
      if (milestoneValue <= highestVisibleMilestone && position <= 95) {
        forwardMilestones.push({
          value: milestoneValue,
          position: position,
          reward: milestoneValue === targetGrowthPercentage ? 1000 : 250 * (milestoneValue - targetGrowthPercentage),
          isUnlocked: growthPercentage >= milestoneValue,
          isTarget: milestoneValue === targetGrowthPercentage
        });
      }
    }
  } else {
    // Scenario: Growth has not reached activation point
    // Show activation point and a few milestones after it
    const targetPosition = calculatePosition(targetGrowthPercentage);
    
    if (targetPosition >= 5 && targetPosition <= 95) {
      // Add the target milestone
      forwardMilestones.push({
        value: targetGrowthPercentage,
        position: targetPosition,
        reward: 1000,
        isUnlocked: false,
        isTarget: true
      });
      
      // Add a few milestones after the target
      for (let i = 1; i <= 3; i++) {
        const milestoneValue = targetGrowthPercentage + i;
        const position = calculatePosition(milestoneValue);
        
        if (milestoneValue <= highestVisibleMilestone && position <= 95) {
          forwardMilestones.push({
            value: milestoneValue,
            position: position,
            reward: 250 * i,
            isUnlocked: false,
            isTarget: false
          });
        }
      }
    }
  }
  
  // Only show zero separately if it's in a reasonable position and makes sense
  const zeroPosition = calculatePosition(0);
  const showZeroSeparately = 
    growthPercentage < targetGrowthPercentage &&
    growthPercentage > -5 &&
    zeroPosition >= 10 &&
    zeroPosition <= 90 &&
    !shouldShowNegative;
    
  return {
    negativeMilestones,
    forwardMilestones,
    showZeroSeparately,
    zeroPosition
  };
};
