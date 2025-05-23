
import React from 'react';
import DriverCards from '@/components/DriverCards';

interface DashboardDriversProps {
  commissionDrivers: Array<{
    id: number;
    name: string;
    currentValue: number;
    goal: number;
    commission: number;
    nextThreshold: number;
    nextCommission: number;
    progress: number;
    icon: string;
    badgeEarned: boolean;
    trend: Array<{ month: string; value: number }>;
    tip: string;
  }>;
  currency: string;
  t: any;
}

const DashboardDrivers: React.FC<DashboardDriversProps> = ({ commissionDrivers, currency, t }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{t.headers.commissionDrivers}</h2>
      </div>
      
      <DriverCards 
        drivers={commissionDrivers}
        currency={currency}
      />
    </div>
  );
};

export default DashboardDrivers;
