
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
  // Determine which negative milestones to display based on current growth
  const showNegativeMilestones = growthPercentage < 0;
  
  return (
    <div className="relative mt-12 mb-20">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-base font-bold ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
          {growthPercentage}%
        </span>
        <span className="text-sm font-medium">{t.content.targetGrowth} ({targetGrowthPercentage}%)</span>
      </div>
      
      <div className="relative h-12 bg-gray-100 rounded-xl overflow-hidden">
        {/* Background grid lines */}
        <div className="absolute inset-0 grid grid-cols-10 w-full h-full">
          {Array.from({length: 10}).map((_, i) => (
            <div key={i} className="h-full border-r border-gray-200" />
          ))}
        </div>
        
        {/* Progress fill */}
        <div className={`absolute h-full transition-all duration-500 ease-out ${
          growthPercentage < 0 
            ? 'bg-status-danger/30 border-r-4 border-status-danger' 
            : hasReachedTarget 
              ? 'bg-gradient-to-r from-status-success/20 to-status-success/40 border-r-4 border-status-success'
              : 'bg-gradient-to-r from-commission-primary/20 to-commission-primary/40 border-r-4 border-commission-primary'
          }`}
          style={{ width: `${Math.max(0, (growthPercentage + 50) / 100 * 100)}%` }}
        />
        
        {/* Target milestone (13%) */}
        <div className="absolute bottom-0 top-0 w-1 bg-commission-dark"
          style={{ left: `${(targetGrowthPercentage + 50) / 100 * 100}%` }}>
          <div className="absolute -top-10 -translate-x-1/2 flex flex-col items-center">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-commission-dark min-w-[80px]">
              <div className="text-xs font-bold text-center">{targetGrowthPercentage}%</div>
              <div className="text-xs text-center">{currency}{formatCurrency(1000)}</div>
            </div>
            <div className="h-4 w-0.5 bg-commission-dark"></div>
          </div>
        </div>
        
        {/* Zero milestone */}
        <div className="absolute bottom-0 top-0 w-0.5 bg-gray-400"
          style={{ left: `${(0 + 50) / 100 * 100}%` }}>
          <div className="absolute -bottom-6 -translate-x-1/2 text-xs font-medium">0%</div>
        </div>
        
        {/* Negative milestones - only show if relevant */}
        {showNegativeMilestones && 
          [-50, -40, -30, -20, -10].map(value => (
            <div 
              key={`neg-${value}`}
              className="absolute bottom-0 top-0 w-0.5 bg-gray-300"
              style={{ left: `${(value + 50) / 100 * 100}%` }}
            >
              <div className="absolute -bottom-6 -translate-x-1/2 text-[10px] text-gray-500">{value}%</div>
            </div>
          ))
        }
        
        {/* Additional milestones after target - show dynamically based on progress */}
        {Array.from({ length: 7 }, (_, i) => targetGrowthPercentage + i + 1)
          .filter(value => value <= highestVisibleMilestone)
          .map(value => (
            <div 
              key={`add-${value}`}
              className={`absolute bottom-0 top-0 w-0.5 ${growthPercentage >= value ? 'bg-status-success' : 'bg-gray-300'}`}
              style={{ left: `${(value + 50) / 100 * 100}%` }}
            >
              <div className="absolute -top-10 -translate-x-1/2 flex flex-col items-center">
                <div className={`bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border 
                  ${growthPercentage >= value ? 'border-status-success' : 'border-gray-200'} min-w-[80px]`}>
                  <div className="text-xs font-bold text-center">{value}%</div>
                  <div className="text-xs text-center">+{currency}{formatCurrency(250 * (value - targetGrowthPercentage))}</div>
                </div>
                <div className={`h-4 w-0.5 ${growthPercentage >= value ? 'bg-status-success' : 'bg-gray-300'}`}></div>
              </div>
            </div>
          ))
        }
        
        {/* Current position indicator */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 z-10"
          style={{ left: `${(growthPercentage + 50) / 100 * 100}%` }}
        >
          <div className={`w-6 h-6 rounded-full shadow-lg ${
            hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'
          } transform -translate-x-1/2 border-2 border-white flex items-center justify-center`}>
            <span className="text-white text-xs font-bold"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarV3;
