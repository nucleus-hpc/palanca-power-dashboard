
import React from 'react';
import { Target, CalendarDays, ArrowRight, Shield } from 'lucide-react';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
        <div>
          <div className="text-sm text-muted-foreground">{t.content.currentMonthSales}</div>
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
      
      {/* Commission earned with dynamic background based on growth percentage */}
      <div className={`${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'} p-4 rounded-xl flex items-center shadow-sm`}>
        <div className={`${hasReachedTarget ? 'bg-white/30' : 'bg-white/20'} p-3 rounded-full mr-4`}>
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-sm text-white/90">
            {t.content.commissionEarned}
          </div>
          <div className="font-bold text-lg text-white">
            {currency}{formatCurrency(commissionEarned)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeStats;
