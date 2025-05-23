
import React from 'react';
import DetailsButton from '@/components/ui/details-button';

interface TotalSalesProps {
  totalSales: number;
  hasReachedTarget: boolean;
  formatCurrency: (value: number) => string;
  currency: string;
  t: any;
  growthPercentage: number;
}

const TotalSales: React.FC<TotalSalesProps> = ({
  totalSales,
  hasReachedTarget,
  formatCurrency,
  currency,
  t,
  growthPercentage
}) => {
  const formattedGrowth = growthPercentage.toFixed(1).replace(/\.0$/, '');
  
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">{t.content.totalSalesQuarter}</div>
          <DetailsButton />
        </div>
        <div className={`text-sm font-medium ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
          {growthPercentage >= 0 ? '+' : ''}{formattedGrowth}%
        </div>
      </div>
      <div className={`font-bold text-2xl ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
        {currency}{formatCurrency(totalSales)}
      </div>
    </div>
  );
};

export default TotalSales;
