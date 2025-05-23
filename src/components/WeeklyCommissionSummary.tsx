
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

  return (
    <Card className="mb-4 rounded-xl shadow-lg">
      <div className="h-1 bg-commission-primary"></div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-lg flex items-center">
              <DollarSign className="h-5 w-5 mr-3 text-commission-primary" />
              Comisión Semanal
            </h2>
            <div className="text-xs px-2 py-1 bg-gray-100 rounded-md font-medium text-muted-foreground dark:bg-gray-700 flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
              {dateRange}
            </div>
          </div>
        </div>
        
        <div className="text-3xl font-bold text-commission-primary">
          {currency}{formatCurrency(1644.17)}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCommissionSummary;
