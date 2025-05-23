
import React from 'react';
import MilestoneMarker from './MilestoneMarker';
import ActivationFlag from './ActivationFlag';
import CurrentProgressMarker from './CurrentProgressMarker';
import MilestoneLabel from './MilestoneLabel';
import { getMilestoneStyle, calculateMilestones } from './utils/milestoneUtils';

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
  
  // Calculate target position and current position
  const targetPosition = calculatePosition(targetGrowthPercentage);
  const currentPosition = calculatePosition(growthPercentage);
  
  // Calculate milestone positions
  const { 
    negativeMilestones, 
    forwardMilestones,
    showZeroSeparately,
    zeroPosition 
  } = calculateMilestones(
    growthPercentage,
    targetGrowthPercentage,
    lowestVisibleMilestone,
    highestVisibleMilestone,
    calculatePosition
  );

  return (
    <div className="relative h-8 bg-gray-100 rounded-full overflow-visible shadow-inner">
      {/* Progress bar fill */}
      <div 
        className={`h-full ${hasReachedTarget ? 'bg-status-success/70' : 'bg-status-danger/70'}`}
        style={{ 
          width: `${Math.max(0, currentPosition)}%`,
          borderTopLeftRadius: '0.5rem',
          borderBottomLeftRadius: '0.5rem'
        }}
      ></div>
      
      {/* Negative milestone markers */}
      {negativeMilestones.map(value => {
        const { bgColor, textColor } = getMilestoneStyle(value, false, false, targetGrowthPercentage);
        return (
          <MilestoneMarker
            key={`neg-${value}`}
            position={calculatePosition(value)}
            value={value}
            bgColorClass={bgColor}
            textColorClass={textColor}
          />
        );
      })}

      {/* Zero marker - only show if it makes sense in the context */}
      {showZeroSeparately && (
        <MilestoneMarker
          position={zeroPosition}
          value={0}
          bgColorClass="bg-gray-400"
          textColorClass="text-gray-700"
        />
      )}
      
      {/* Target marker (activation point) */}
      <div 
        className="absolute top-0 h-full w-0.5 bg-commission-dark z-20"
        style={{ left: `${targetPosition}%` }}
      >
        {/* Activation Flag - Above the bar, only shown when not yet reached */}
        {growthPercentage < targetGrowthPercentage && (
          <ActivationFlag
            targetGrowthPercentage={targetGrowthPercentage}
            currency={currency}
            formatCurrency={formatCurrency}
          />
        )}
        
        {/* Target milestone label below the bar */}
        {growthPercentage >= targetGrowthPercentage && (
          <MilestoneLabel 
            value={targetGrowthPercentage} 
            textColorClass="text-commission-dark" 
            reward={1000} 
            currency={currency}
            formatCurrency={formatCurrency}
          />
        )}
      </div>
      
      {/* Forward milestone markers - after target */}
      {forwardMilestones.map((milestone, index) => {
        const { bgColor, textColor } = getMilestoneStyle(
          milestone.value, 
          milestone.isTarget, 
          milestone.isUnlocked,
          targetGrowthPercentage
        );
        
        return (
          <MilestoneMarker
            key={`forward-${index}`}
            position={milestone.position}
            value={milestone.value}
            bgColorClass={bgColor}
            textColorClass={textColor}
            reward={milestone.reward}
            currency={currency}
            formatCurrency={formatCurrency}
          />
        );
      })}
      
      {/* Current position marker */}
      <CurrentProgressMarker 
        position={currentPosition} 
        growthValue={formattedGrowth} 
        hasReachedTarget={hasReachedTarget}
      />
    </div>
  );
};

export default ProgressBarV1;
