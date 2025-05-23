
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Calendar } from 'lucide-react';

interface WeeklyCommissionSummaryProps {
  dateRange: string;
  commission: number;
  currency: string;
}

const WeeklyCommissionSummary: React.FC<WeeklyCommissionSummaryProps> = ({
  dateRange,
  commission,
  currency
}) => {
  // Format numbers with two decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-GT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  // Determine background color based on commission value
  const isPositive = commission > 0;
  const bgColor = isPositive ? 'bg-status-success' : 'bg-status-danger';

  return (
    <Card className="mb-4 rounded-xl shadow-lg">
      <div className="h-1 bg-commission-primary"></div>
      <CardContent className={`p-4 ${bgColor}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-lg flex items-center text-white">
              <DollarSign className="h-5 w-5 mr-3 text-white" />
              Comisión Semanal
            </h2>
            <div className="text-xs px-2 py-1 bg-white/20 rounded-md font-medium text-white flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-white" />
              {dateRange}
            </div>
          </div>
        </div>
        
        <div className="text-3xl font-bold text-white">
          {currency}{formatCurrency(1644.17)}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCommissionSummary;
