
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

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
  const { t } = useLanguage();
  const isPositive = commission > 0;

  // Format currency with two decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-GT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  return (
    <Card className="mb-6 shadow-md rounded-xl overflow-hidden">
      <CardContent className="p-6 bg-gray-50 dark:highlighted-card">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
            <Calendar className="h-6 w-6 text-commission-primary" />
          </div>
          
          <div className="flex flex-col">
            <div className="text-sm font-medium text-muted-foreground">
              {dateRange}
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm font-medium text-muted-foreground">
                {t.content.weeklyCommission}
              </h2>
              <div className={`text-3xl font-bold ${isPositive ? 'text-status-success' : 'text-status-neutral'}`}>
                {currency}{formatCurrency(commission)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCommissionSummary;
