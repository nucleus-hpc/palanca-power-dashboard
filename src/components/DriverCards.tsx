
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, Star, TrendingUp, Flag } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/i18n/LanguageContext';

interface Driver {
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
  tip: string;
}

interface DriverCardsProps {
  drivers: Driver[];
  currency: string;
}

const DriverCards: React.FC<DriverCardsProps> = ({ drivers, currency }) => {
  const { t } = useLanguage();
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trending-up': return <TrendingUp className="h-5 w-5" />;
      case 'star': return <Star className="h-5 w-5" />;
      case 'flag': return <Flag className="h-5 w-5" />;
      default: return <CircleCheck className="h-5 w-5" />;
    }
  };
  
  const getStatusClass = (progress: number) => {
    if (progress >= 85) return 'text-status-success';
    if (progress >= 60) return 'text-status-warning';
    return 'text-status-danger';
  };

  // Format numbers with two decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-GT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {drivers.map(driver => (
        <Card key={driver.id} className="overflow-hidden hover:shadow-lg transition-shadow rounded-xl">
          <div className={`h-2 ${driver.progress >= 85 ? 'bg-status-success' : driver.progress >= 60 ? 'bg-status-warning' : 'bg-status-danger'}`}></div>
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${driver.progress >= 85 ? 'bg-green-100 dark:bg-green-900/30' : driver.progress >= 60 ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-red-100 dark:bg-red-900/30'} mr-3`}>
                  {getIcon(driver.icon)}
                </div>
                <h3 className="font-medium">{driver.name}</h3>
              </div>
              {driver.badgeEarned && (
                <Badge className="bg-commission-primary py-1 px-2">
                  <Star className="h-3 w-3 mr-1" /> {t.common.badges}
                </Badge>
              )}
            </div>
            
            <div className="mt-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{t.common.progress}</span>
                <span className={`${getStatusClass(driver.progress)}`}>{driver.progress}%</span>
              </div>
              <Progress value={driver.progress} className="h-3 rounded-full" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="rounded-xl bg-gray-50 p-3 text-center dark:highlighted-card shadow-sm">
                <div className="text-xs text-muted-foreground">{t.common.current}</div>
                <div className="font-semibold">
                  {typeof driver.currentValue === 'number' && driver.currentValue % 1 === 0 
                    ? driver.currentValue 
                    : `${currency}${formatCurrency(driver.currentValue)}`}
                </div>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 text-center dark:highlighted-card shadow-sm">
                <div className="text-xs text-muted-foreground">{t.common.goal}</div>
                <div className="font-semibold">
                  {typeof driver.goal === 'number' && driver.goal % 1 === 0 
                    ? driver.goal 
                    : `${currency}${formatCurrency(driver.goal)}`}
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-commission-light rounded-xl p-3 shadow-sm">
              <div className="text-xs text-center">
                {t.common.earned}: <span className="font-bold text-commission-primary">{currency}{formatCurrency(driver.commission)}</span>
              </div>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="mt-3 text-center text-xs bg-gray-100 rounded-full py-1.5 px-3 text-gray-600 hover:bg-gray-200 transition-colors shadow-sm">
                    {typeof driver.nextThreshold === 'number' && driver.nextThreshold % 1 === 0 
                      ? `${t.content.reachToEarn} ${driver.nextThreshold} ${t.content.toEarn} +${currency}${formatCurrency(driver.nextCommission)}` 
                      : `${t.content.reachToEarn} ${currency}${formatCurrency(driver.nextThreshold)} ${t.content.toEarn} +${currency}${formatCurrency(driver.nextCommission)}`}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{driver.tip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DriverCards;
