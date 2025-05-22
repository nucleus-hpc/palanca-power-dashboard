
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

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
  const isPositive = commission > 0;

  return (
    <Card className="mb-6">
      <CardContent className="p-4 pt-5">
        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{dateRange}</span>
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-medium text-muted-foreground">Weekly Commission</h2>
          <div className={`text-3xl font-bold ${isPositive ? 'text-status-success' : 'text-status-danger'}`}>
            {currency}{commission.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCommissionSummary;
