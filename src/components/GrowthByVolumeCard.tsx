
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Target, 
  CalendarDays, 
  ArrowRight, 
  Shield 
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface GrowthByVolumeCardProps {
  totalSales: number;
  growthPercentage: number;
  growthTarget: number;
  targetGrowthPercentage: number;
  currentMonthSales: number;
  remainingSalesNeeded: number;
  commissionEarned: number;
  currency: string;
}

const GrowthByVolumeCard: React.FC<GrowthByVolumeCardProps> = ({
  totalSales,
  growthPercentage,
  growthTarget,
  targetGrowthPercentage,
  currentMonthSales,
  remainingSalesNeeded,
  commissionEarned,
  currency
}) => {
  const { t } = useLanguage();
  const isGrowthPositive = growthPercentage >= 0;
  const hasReachedTarget = growthPercentage >= targetGrowthPercentage;
  
  // For the enhanced progress bar
  const highestVisibleMilestone = Math.max(targetGrowthPercentage + 5, growthPercentage + 2);
  const lowestVisibleMilestone = Math.min(-50, growthPercentage - 10);
  const range = highestVisibleMilestone - lowestVisibleMilestone;
  
  // Calculate position percentage for the progress bar
  const calculatePosition = (value: number) => {
    return ((value - lowestVisibleMilestone) / range) * 100;
  };
  
  // Calculate the current position in the progress bar
  const currentPosition = calculatePosition(growthPercentage);
  const targetPosition = calculatePosition(targetGrowthPercentage);
  
  // Generate negative markers
  const negativeMarkers = Array.from({ length: 6 }, (_, i) => {
    const marker = -50 + (i * 10);
    return {
      value: marker,
      position: calculatePosition(marker),
      visible: marker >= lowestVisibleMilestone && marker <= highestVisibleMilestone
    };
  });
  
  // Generate milestones for each 1% increment after the target
  const additionalMarkers = Array.from(
    { length: Math.max(5, Math.ceil(growthPercentage - targetGrowthPercentage) + 2) },
    (_, i) => {
      const marker = targetGrowthPercentage + i + 1;
      return {
        value: marker,
        position: calculatePosition(marker),
        visible: marker <= highestVisibleMilestone,
        unlocked: growthPercentage >= marker,
        reward: 250 * (i + 1)
      };
    }
  );
  
  // Format numbers with two decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-GT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  return (
    <Card className="mb-6 overflow-hidden rounded-xl shadow-lg">
      <div className="h-1 bg-commission-primary"></div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-3 text-commission-primary" />
            {t.headers.growthByVolume}
          </h2>
        </div>
        
        {/* Primary highlight - Total Sales */}
        <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:highlighted-card shadow-sm">
          <div className="text-sm text-muted-foreground">{t.content.totalSalesQuarter}</div>
          <div className={`font-bold text-2xl ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
            {currency}{formatCurrency(totalSales)}
          </div>
        </div>
        
        {/* Enhanced Progress Bar with Dynamic Milestones */}
        <div className="my-8">
          <div className="text-sm text-muted-foreground mb-3 flex justify-between">
            <span className={`font-medium text-base ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
              {growthPercentage}%
            </span>
            <span className="font-medium">{t.content.targetGrowth.replace('Objetivo', 'Meta')} ({targetGrowthPercentage}%)</span>
          </div>
          
          <div className="relative h-10 bg-gray-100 rounded-full overflow-hidden mb-16 shadow-inner">
            {/* Progress bar fill */}
            <div 
              className={`h-full ${
                growthPercentage < 0 
                  ? 'bg-status-danger' 
                  : hasReachedTarget 
                    ? 'bg-status-success' 
                    : 'bg-commission-primary'
              }`}
              style={{ 
                width: `${Math.max(0, currentPosition)}%`, 
                transition: 'width 1s ease-in-out' 
              }}
            ></div>
            
            {/* Zero marker */}
            <div 
              className="absolute top-0 h-full w-0.5 bg-gray-400" 
              style={{ left: `${calculatePosition(0)}%` }}
            >
              <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-gray-400"></div>
              <div className="absolute -bottom-8 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                0%
              </div>
            </div>
            
            {/* Negative markers */}
            {negativeMarkers.map((marker, index) => (
              marker.visible && (
                <div 
                  key={`neg-${index}`}
                  className="absolute top-0 h-full w-0.5 bg-gray-300"
                  style={{ left: `${marker.position}%` }}
                >
                  <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-gray-300"></div>
                  <div className="absolute -bottom-8 -translate-x-1/2 text-xs font-medium whitespace-nowrap text-status-danger">
                    {marker.value}%
                  </div>
                </div>
              )
            ))}
            
            {/* Target marker - 13% milestone */}
            <div 
              className="absolute top-0 h-full w-0.5 bg-commission-dark" 
              style={{ left: `${targetPosition}%` }}
            >
              <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-commission-dark"></div>
              <div className="absolute -bottom-16 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md border border-gray-200">
                  <span className="font-bold">{targetGrowthPercentage}%</span>
                  <br />
                  <span>{currency}{formatCurrency(1000)}</span>
                </div>
              </div>
            </div>
            
            {/* Additional reward markers */}
            {additionalMarkers.map((marker, index) => (
              marker.visible && (
                <div 
                  key={index}
                  className={`absolute top-0 h-full w-0.5 ${marker.unlocked ? 'bg-status-success' : 'bg-status-neutral'}`}
                  style={{ left: `${marker.position}%` }}
                >
                  <div 
                    className={`absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 
                      ${marker.unlocked ? 'border-status-success' : 'border-status-neutral'}`}>
                  </div>
                  <div className="absolute -bottom-16 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                    <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md border border-gray-200">
                      <span className="font-bold">{marker.value}%</span>
                      <br />
                      <span>+{currency}{formatCurrency(marker.reward)}</span>
                    </div>
                  </div>
                </div>
              )
            ))}
            
            {/* Current position marker */}
            <div 
              className={`absolute top-0 h-full w-2 ${hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'}`}
              style={{ left: `${currentPosition}%` }}
            >
            </div>
          </div>
        </div>
        
        {/* Data points with icons */}
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
          
          {/* Commission earned with green background */}
          <div className="bg-status-success p-4 rounded-xl flex items-center shadow-sm">
            <div className="bg-white/30 p-3 rounded-full mr-4">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-white/90">{t.content.commissionEarned}</div>
              <div className="font-bold text-lg text-white">
                {currency}{formatCurrency(commissionEarned)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthByVolumeCard;
