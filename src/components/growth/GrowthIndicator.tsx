
import React from 'react';

interface GrowthIndicatorProps {
  growthPercentage: number;
  targetGrowthPercentage: number;
  hasReachedTarget: boolean;
  t: any;
}

const GrowthIndicator: React.FC<GrowthIndicatorProps> = ({
  growthPercentage,
  targetGrowthPercentage,
  hasReachedTarget,
  t
}) => {
  return (
    <div className="text-sm text-muted-foreground mb-3 flex justify-between">
      <span className={`font-medium text-base ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
        {growthPercentage}%
      </span>
      <span className="font-medium">{t.content.targetGrowth.replace('Objetivo', 'Meta')} ({targetGrowthPercentage}%)</span>
    </div>
  );
};

export default GrowthIndicator;
