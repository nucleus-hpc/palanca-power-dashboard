
import React from 'react';
import MilestoneLabel from './MilestoneLabel';

interface MilestoneMarkerProps {
  position: number;
  value: number;
  bgColorClass: string;
  textColorClass: string;
  reward?: number | null;
  currency?: string;
  formatCurrency?: (value: number) => string;
  isTarget?: boolean;
  children?: React.ReactNode;
}

const MilestoneMarker: React.FC<MilestoneMarkerProps> = ({
  position,
  value,
  bgColorClass,
  textColorClass,
  reward = null,
  currency = '',
  formatCurrency = (val) => val.toString(),
  isTarget = false,
  children
}) => (
  <div 
    className={`absolute top-0 h-full w-0.5 ${bgColorClass}`}
    style={{ left: `${position}%` }}
  >
    {children}
    <MilestoneLabel 
      value={value} 
      textColorClass={textColorClass}
      reward={reward}
      currency={currency}
      formatCurrency={formatCurrency}
    />
  </div>
);

export default MilestoneMarker;
