
import React from 'react';

interface MilestoneLabelProps {
  value: number;
  textColorClass: string;
  reward?: number | null;
  currency?: string;
  formatCurrency?: (value: number) => string;
}

const MilestoneLabel: React.FC<MilestoneLabelProps> = ({ 
  value, 
  textColorClass, 
  reward = null,
  currency = '',
  formatCurrency = (val) => val.toString()
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

export default MilestoneLabel;
