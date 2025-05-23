
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
  
  // Determine which milestones to show based on current growth
  const showNegativeMilestones = growthPercentage < 0;
  
  // Generate zero and target markers
  const keyMilestones = [
    { value: 0, position: calculatePosition(0), label: "0%" },
    { 
      value: targetGrowthPercentage, 
      position: calculatePosition(targetGrowthPercentage), 
      label: `${targetGrowthPercentage}%`, 
      isTarget: true,
      reward: 1000
    }
  ];
  
  // Add negative milestones if relevant
  const negativeMarkers = showNegativeMilestones ? 
    [-50, -40, -30, -20, -10].map(value => ({
      value,
      position: calculatePosition(value),
      label: `${value}%`,
      visible: value >= lowestVisibleMilestone && value <= highestVisibleMilestone
    })) : [];
  
  // Generate forward-looking milestones (always show at least 2 beyond target)
  const forwardMarkers = Array.from(
    { length: 5 },
    (_, i) => {
      const value = targetGrowthPercentage + i + 1;
      return {
        value,
        position: calculatePosition(value),
        visible: value <= highestVisibleMilestone,
        unlocked: growthPercentage >= value,
        label: `${value}%`,
        reward: 250 * (i + 1)
      };
    }
  ).filter(marker => marker.value <= highestVisibleMilestone);

  return (
    <div className="relative h-10 bg-gray-100 rounded-full overflow-hidden mb-20 shadow-inner">
      {/* Progress bar fill */}
      <div 
        className={`h-full ${
          growthPercentage < 0 
            ? 'bg-status-danger' 
            : hasReachedTarget 
              ? 'bg-status-success' 
              : 'bg-status-danger'
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
        <div className="absolute -bottom-8 -translate-x-1/2 text-xs font-semibold whitespace-nowrap bg-status-neutral px-2 py-1 rounded-sm text-white">
          0%
        </div>
      </div>
      
      {/* Negative markers - only show if relevant */}
      {negativeMarkers.map((marker, index) => (
        marker.visible && (
          <div 
            key={`neg-${index}`}
            className="absolute top-0 h-full w-0.5 bg-gray-300"
            style={{ left: `${marker.position}%` }}
          >
            <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-gray-300"></div>
            <div className="absolute -bottom-8 -translate-x-1/2 text-xs font-medium whitespace-nowrap text-status-danger">
              {marker.label}
            </div>
          </div>
        )
      ))}
      
      {/* Target marker - 13% milestone with activation point label */}
      <div 
        className="absolute top-0 h-full w-0.5 bg-commission-dark" 
        style={{ left: `${targetPosition}%` }}
      >
        <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-commission-dark"></div>
        <div className="absolute -bottom-16 -translate-x-1/2 text-xs whitespace-nowrap">
          <div className="flex flex-col items-center">
            <div className="bg-sidebar-accent text-white px-2 py-1 rounded-t-md text-xs">
              Punto de Activación
            </div>
            <div className="bg-sidebar-accent text-white p-2 rounded-b-md shadow-md min-w-[80px] text-center">
              <span className="font-bold">{targetGrowthPercentage}%</span>
              <br />
              <span>+{currency}{formatCurrency(1000)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional reward markers */}
      {forwardMarkers.slice(0, 4).map((marker, index) => (
        <div 
          key={index}
          className={`absolute top-0 h-full w-0.5 ${marker.unlocked ? 'bg-status-success' : 'bg-gray-400'}`}
          style={{ left: `${marker.position}%` }}
        >
          <div 
            className={`absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 
              ${marker.unlocked ? 'border-status-success' : 'border-gray-400'}`}>
          </div>
          <div className="absolute -bottom-16 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
            <div className={`bg-gray-300 text-gray-700 p-2 rounded-md shadow-md text-center min-w-[80px] ${
              marker.unlocked ? 'bg-gray-200' : ''
            }`}>
              <span className="font-bold">{marker.label}</span>
              <br />
              <span>+{currency}{formatCurrency(marker.reward)}</span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Current position marker */}
      <div 
        className={`absolute top-0 h-full w-2 ${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'}`}
        style={{ left: `${currentPosition}%` }}
      >
        <div className="absolute -top-8 -translate-x-1/2 text-xs font-bold whitespace-nowrap bg-white p-1 rounded shadow border border-gray-200">
          {growthPercentage}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBarV1;
