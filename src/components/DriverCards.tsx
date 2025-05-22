
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, Star, TrendingUp, Flag } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {drivers.map(driver => (
        <Card key={driver.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className={`h-2 ${driver.progress >= 85 ? 'bg-status-success' : driver.progress >= 60 ? 'bg-status-warning' : 'bg-status-danger'}`}></div>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${driver.progress >= 85 ? 'bg-green-100 dark:bg-green-900/30' : driver.progress >= 60 ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-red-100 dark:bg-red-900/30'} mr-2`}>
                  {getIcon(driver.icon)}
                </div>
                <h3 className="font-medium">{driver.name}</h3>
              </div>
              {driver.badgeEarned && (
                <Badge className="bg-commission-primary">
                  <Star className="h-3 w-3 mr-1" /> Badge
                </Badge>
              )}
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Progress</span>
                <span className={`${getStatusClass(driver.progress)}`}>{driver.progress}%</span>
              </div>
              <Progress value={driver.progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="rounded-lg bg-gray-50 p-2 text-center dark:highlighted-card">
                <div className="text-xs text-muted-foreground">Current</div>
                <div className="font-semibold">{typeof driver.currentValue === 'number' && driver.currentValue % 1 === 0 ? driver.currentValue : `${currency}${driver.currentValue.toLocaleString()}`}</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-2 text-center dark:highlighted-card">
                <div className="text-xs text-muted-foreground">Goal</div>
                <div className="font-semibold">{typeof driver.goal === 'number' && driver.goal % 1 === 0 ? driver.goal : `${currency}${driver.goal.toLocaleString()}`}</div>
              </div>
            </div>
            
            <div className="mt-3 bg-commission-light rounded-lg p-2">
              <div className="text-xs text-center">
                Earned: <span className="font-bold text-commission-primary">{currency}{driver.commission.toLocaleString()}</span>
              </div>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="mt-2 text-center text-xs bg-gray-100 rounded-full py-1 px-2 text-gray-600 hover:bg-gray-200 transition-colors">
                    {typeof driver.nextThreshold === 'number' && driver.nextThreshold % 1 === 0 
                      ? `Reach ${driver.nextThreshold} to earn +${currency}${driver.nextCommission}` 
                      : `Reach ${currency}${driver.nextThreshold.toLocaleString()} to earn +${currency}${driver.nextCommission}`}
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
