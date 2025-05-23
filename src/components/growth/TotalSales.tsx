
import React from 'react';

interface TotalSalesProps {
  totalSales: number;
  hasReachedTarget: boolean;
  formatCurrency: (value: number) => string;
  currency: string;
  t: any;
}

const TotalSales: React.FC<TotalSalesProps> = ({
  totalSales,
  hasReachedTarget,
  formatCurrency,
  currency,
  t
}) => {
  return (
    <div className="mb-6">
      <div className="text-sm text-muted-foreground">{t.content.totalSalesQuarter}</div>
      <div className={`font-bold text-2xl ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
        {currency}{formatCurrency(totalSales)}
      </div>
    </div>
  );
};

export default TotalSales;
