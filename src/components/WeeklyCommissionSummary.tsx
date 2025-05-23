
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';
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

  // Background and text colors based on amount
  const bgColor = isPositive ? 'bg-[#10B981]' : 'bg-[#D93025]';
  const textColor = 'text-white';

  return (
    <Card className="mb-6 shadow-md rounded-xl overflow-hidden">
      <CardContent className={`p-6 ${bgColor}`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-white/20">
            <Shield className={`h-6 w-6 ${textColor}`} />
          </div>
          
          <div className="flex flex-col">
            <div className={`text-sm font-medium ${textColor}`}>
              {dateRange}
            </div>
            <div className="flex flex-col">
              <h2 className={`text-sm font-medium ${textColor}`}>
                {t.content.weeklyCommission}
              </h2>
              <div className={`text-3xl font-bold ${textColor}`}>
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
