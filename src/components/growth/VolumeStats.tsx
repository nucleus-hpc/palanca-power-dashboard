
import React from 'react';
import { Target, CalendarDays, ArrowRight } from 'lucide-react';
import CommissionEarned from '@/components/commission/CommissionEarned';
import DetailsButton from '@/components/ui/details-button';

interface VolumeStatsProps {
  hasReachedTarget: boolean;
  targetGrowthPercentage: number;
  growthTarget: number;
  currentMonthSales: number;
  remainingSalesNeeded: number;
  commissionEarned: number;
  formatCurrency: (value: number) => string; 
  currency: string;
  t: any;
}

const VolumeStats: React.FC<VolumeStatsProps> = ({
  hasReachedTarget,
  targetGrowthPercentage,
  growthTarget,
  currentMonthSales,
  remainingSalesNeeded,
  commissionEarned,
  formatCurrency,
  currency,
  t
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="bg-gray-50 p-4 rounded-xl flex items-center dark:highlighted-card shadow-sm">
        <div className="bg-gray-100 p-3 rounded-full mr-4 dark:bg-gray-700">
          <Target className="h-5 w-5 text-commission-primary" />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Meta de Crecimiento ({targetGrowthPercentage}%)</div>
          <div className="font-bold">{currency}{formatCurrency(growthTarget)}</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-xl flex items-center dark:highlighted-card shadow-sm">
        <div className="bg-gray-100 p-3 rounded-full mr-4 dark:bg-gray-700">
          <CalendarDays className="h-5 w-5 text-commission-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">{t.content.currentMonthSales}</div>
              <DetailsButton />
            </div>
          </div>
          <div className="font-bold">{currency}{formatCurrency(currentMonthSales)}</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-xl flex items-center dark:highlighted-card shadow-sm">
        <div className="bg-gray-100 p-3 rounded-full mr-4 dark:bg-gray-700">
          <ArrowRight className="h-5 w-5 text-commission-primary" />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Saldo Pendiente para Crecimiento</div>
          <div className="font-bold">{currency}{formatCurrency(remainingSalesNeeded)}</div>
        </div>
      </div>
      
      {/* Commission earned component reverted to original style */}
      <CommissionEarned 
        amount={commissionEarned} 
        currency={currency} 
        label={t.content.commissionEarned}
      />
    </div>
  );
};

export default VolumeStats;
