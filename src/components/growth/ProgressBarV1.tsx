
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
  // Current position marker
  const currentPosition = calculatePosition(growthPercentage);
  const targetPosition = calculatePosition(targetGrowthPercentage);
  
  // Generate negative markers
  const negativeMarkers = Array.from({ length: 6 }, (_, i) => {
    const marker = -50 + (i * 10);
    return {
      value: marker,
      position: calculatePosition(marker),
      visible: marker >= lowestVisibleMilestone && marker <= highestVisibleMilestone
    };
  });
  
  // Generate milestones for each 1% increment after the target
  const additionalMarkers = Array.from(
    { length: Math.max(5, Math.ceil(growthPercentage - targetGrowthPercentage) + 2) },
    (_, i) => {
      const marker = targetGrowthPercentage + i + 1;
      return {
        value: marker,
        position: calculatePosition(marker),
        visible: marker <= highestVisibleMilestone,
        unlocked: growthPercentage >= marker,
        reward: 250 * (i + 1)
      };
    }
  );

  return (
    <div className="relative h-10 bg-gray-100 rounded-full overflow-hidden mb-20 shadow-inner">
      {/* Progress bar fill */}
      <div 
        className={`h-full ${
          growthPercentage < 0 
            ? 'bg-status-danger' 
            : hasReachedTarget 
              ? 'bg-status-success' 
              : 'bg-commission-primary'
        }`}
        style={{ 
          width: `${Math.max(0, currentPosition)}%`, 
          transition: 'width 1s ease-in-out' 
        }}
      ></div>
      
      {/* Zero marker */}
      <div 
        className="absolute top-0 h-full w-0.5 bg-gray-400" 
        style={{ left: `${calculatePosition(0)}%` }}
      >
        <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-gray-400"></div>
        <div className="absolute -bottom-8 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
          0%
        </div>
      </div>
      
      {/* Negative markers */}
      {negativeMarkers.map((marker, index) => (
        marker.visible && (
          <div 
            key={`neg-${index}`}
            className="absolute top-0 h-full w-0.5 bg-gray-300"
            style={{ left: `${marker.position}%` }}
          >
            <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-gray-300"></div>
            <div className="absolute -bottom-8 -translate-x-1/2 text-xs font-medium whitespace-nowrap text-status-danger">
              {marker.value}%
            </div>
          </div>
        )
      ))}
      
      {/* Target marker - 13% milestone */}
      <div 
        className="absolute top-0 h-full w-0.5 bg-commission-dark" 
        style={{ left: `${targetPosition}%` }}
      >
        <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-commission-dark"></div>
        <div className="absolute -bottom-16 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md border border-gray-200">
            <span className="font-bold">{targetGrowthPercentage}%</span>
            <br />
            <span>{currency}{formatCurrency(1000)}</span>
          </div>
        </div>
      </div>
      
      {/* Additional reward markers */}
      {additionalMarkers.map((marker, index) => (
        marker.visible && (
          <div 
            key={index}
            className={`absolute top-0 h-full w-0.5 ${marker.unlocked ? 'bg-status-success' : 'bg-status-neutral'}`}
            style={{ left: `${marker.position}%` }}
          >
            <div 
              className={`absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 
                ${marker.unlocked ? 'border-status-success' : 'border-status-neutral'}`}>
            </div>
            <div className="absolute -bottom-16 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md border border-gray-200">
                <span className="font-bold">{marker.value}%</span>
                <br />
                <span>+{currency}{formatCurrency(marker.reward)}</span>
              </div>
            </div>
          </div>
        )
      ))}
      
      {/* Current position marker */}
      <div 
        className={`absolute top-0 h-full w-2 ${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'}`}
        style={{ left: `${currentPosition}%` }}
      >
      </div>
    </div>
  );
};

export default ProgressBarV1;
