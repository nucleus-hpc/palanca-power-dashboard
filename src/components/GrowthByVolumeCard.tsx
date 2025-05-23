
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
        
        {/* Main Growth Percentage Indicator */}
        <div className="my-8">
          <div className="text-sm text-muted-foreground mb-3 flex justify-between">
            <span className={`font-medium text-base ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
              {growthPercentage}%
            </span>
            <span className="font-medium">{t.content.targetGrowth.replace('Objetivo', 'Meta')} ({targetGrowthPercentage}%)</span>
          </div>
          
          {/* Enhanced Progress Bar - Version 1 */}
          <div className="relative h-10 bg-gray-100 rounded-full overflow-hidden mb-20 shadow-inner">
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
          
          {/* Alternative Progress Bar Design - Version 2 */}
          <div className="relative rounded-lg overflow-hidden mb-24 mt-12 bg-gray-100 h-2">
            {/* Base progress track */}
            <div className={`absolute top-0 left-0 h-full ${
              growthPercentage < 0 ? 'bg-status-danger' : 
              hasReachedTarget ? 'bg-status-success' : 'bg-commission-primary'
            }`} style={{ width: `${Math.max(0, (growthPercentage + 50) / (highestVisibleMilestone + 50) * 100)}%` }}></div>
            
            {/* Milestone markers */}
            <div className="absolute w-full h-full">
              {/* Zero marker */}
              <div className="absolute top-0 h-8 w-1 bg-gray-400" style={{ left: `${(0 + 50) / (highestVisibleMilestone + 50) * 100}%` }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
                  <span className="text-xs font-bold">0%</span>
                </div>
              </div>
              
              {/* Target marker (13%) */}
              <div className="absolute top-0 h-8 w-1 bg-commission-dark" style={{ left: `${(targetGrowthPercentage + 50) / (highestVisibleMilestone + 50) * 100}%` }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md border border-commission-dark flex flex-col items-center">
                  <span className="text-xs font-bold">{targetGrowthPercentage}%</span>
                  <span className="text-xs">{currency}{formatCurrency(1000)}</span>
                </div>
              </div>
              
              {/* Negative markers (-50% to 0%) */}
              {[-50, -40, -30, -20, -10].map(value => (
                <div 
                  key={`negative-${value}`} 
                  className="absolute top-0 h-4 w-1 bg-gray-300" 
                  style={{ left: `${(value + 50) / (highestVisibleMilestone + 50) * 100}%` }}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] text-gray-500">{value}%</span>
                  </div>
                </div>
              ))}
              
              {/* Additional markers after target (each 1%) */}
              {Array.from({ length: 7 }, (_, i) => targetGrowthPercentage + i + 1).map(value => (
                <div 
                  key={`additional-${value}`}
                  className={`absolute top-0 h-6 w-1 ${growthPercentage >= value ? 'bg-status-success' : 'bg-gray-300'}`}
                  style={{ left: `${(value + 50) / (highestVisibleMilestone + 50) * 100}%` }}
                >
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md border
                    ${growthPercentage >= value ? 'border-status-success' : 'border-gray-200'} flex flex-col items-center`}>
                    <span className="text-xs font-bold">{value}%</span>
                    <span className="text-xs">+{currency}{formatCurrency(250 * (value - targetGrowthPercentage))}</span>
                  </div>
                </div>
              ))}
              
              {/* Current position indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${(growthPercentage + 50) / (highestVisibleMilestone + 50) * 100}%` }}
              >
                <div className={`w-5 h-5 rounded-full shadow-md ${
                  hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'
                } transform -translate-x-1/2 border-2 border-white flex items-center justify-center`}>
                </div>
              </div>
            </div>
          </div>
          
          {/* Alternative Progress Bar Design - Version 3 */}
          <div className="hidden relative mt-24 mb-20">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-base font-bold ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
                {growthPercentage}%
              </span>
              <span className="text-sm font-medium">{t.content.targetGrowth} ({targetGrowthPercentage}%)</span>
            </div>
            
            <div className="relative h-12 bg-gray-100 rounded-xl overflow-hidden">
              {/* Background grid lines */}
              <div className="absolute inset-0 grid grid-cols-10 w-full h-full">
                {Array.from({length: 10}).map((_, i) => (
                  <div key={i} className="h-full border-r border-gray-200" />
                ))}
              </div>
              
              {/* Progress fill */}
              <div className={`absolute h-full transition-all duration-500 ease-out ${
                growthPercentage < 0 
                  ? 'bg-status-danger/30 border-r-4 border-status-danger' 
                  : hasReachedTarget 
                    ? 'bg-gradient-to-r from-status-success/20 to-status-success/40 border-r-4 border-status-success'
                    : 'bg-gradient-to-r from-commission-primary/20 to-commission-primary/40 border-r-4 border-commission-primary'
                }`}
                style={{ width: `${Math.max(0, (growthPercentage + 50) / 100 * 100)}%` }}
              />
              
              {/* Key milestones */}
              {/* Target milestone (13%) */}
              <div className="absolute bottom-0 top-0 w-1 bg-commission-dark"
                style={{ left: `${(targetGrowthPercentage + 50) / 100 * 100}%` }}>
                <div className="absolute -top-10 -translate-x-1/2 flex flex-col items-center">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-commission-dark min-w-[80px]">
                    <div className="text-xs font-bold text-center">{targetGrowthPercentage}%</div>
                    <div className="text-xs text-center">{currency}{formatCurrency(1000)}</div>
                  </div>
                  <div className="h-4 w-0.5 bg-commission-dark"></div>
                </div>
              </div>
              
              {/* Zero milestone */}
              <div className="absolute bottom-0 top-0 w-0.5 bg-gray-400"
                style={{ left: `${(0 + 50) / 100 * 100}%` }}>
                <div className="absolute -bottom-6 -translate-x-1/2 text-xs font-medium">0%</div>
              </div>
              
              {/* Negative milestones */}
              {[-50, -40, -30, -20, -10].map(value => (
                <div 
                  key={`neg-${value}`}
                  className="absolute bottom-0 top-0 w-0.5 bg-gray-300"
                  style={{ left: `${(value + 50) / 100 * 100}%` }}
                >
                  <div className="absolute -bottom-6 -translate-x-1/2 text-[10px] text-gray-500">{value}%</div>
                </div>
              ))}
              
              {/* Additional milestones after target */}
              {Array.from({ length: 7 }, (_, i) => targetGrowthPercentage + i + 1).map(value => (
                <div 
                  key={`add-${value}`}
                  className={`absolute bottom-0 top-0 w-0.5 ${growthPercentage >= value ? 'bg-status-success' : 'bg-gray-300'}`}
                  style={{ left: `${(value + 50) / 100 * 100}%` }}
                >
                  <div className="absolute -top-10 -translate-x-1/2 flex flex-col items-center">
                    <div className={`bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border 
                      ${growthPercentage >= value ? 'border-status-success' : 'border-gray-200'} min-w-[80px]`}>
                      <div className="text-xs font-bold text-center">{value}%</div>
                      <div className="text-xs text-center">+{currency}{formatCurrency(250 * (value - targetGrowthPercentage))}</div>
                    </div>
                    <div className={`h-4 w-0.5 ${growthPercentage >= value ? 'bg-status-success' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              ))}
              
              {/* Current position indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 z-10"
                style={{ left: `${(growthPercentage + 50) / 100 * 100}%` }}
              >
                <div className={`w-6 h-6 rounded-full shadow-lg ${
                  hasReachedTarget ? 'bg-status-success' : 'bg-status-danger'
                } transform -translate-x-1/2 border-2 border-white flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Total Sales Card - Removed highlight background as requested */}
        <div className="mb-6">
          <div className="text-sm text-muted-foreground">{t.content.totalSalesQuarter}</div>
          <div className={`font-bold text-2xl ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
            {currency}{formatCurrency(totalSales)}
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
          
          {/* Commission earned with dynamic background based on growth percentage */}
          <div className={`${hasReachedTarget ? 'bg-status-success' : 'bg-gray-50 dark:highlighted-card'} p-4 rounded-xl flex items-center shadow-sm`}>
            <div className={`${hasReachedTarget ? 'bg-white/30' : 'bg-gray-100 dark:bg-gray-700'} p-3 rounded-full mr-4`}>
              <Shield className={`h-5 w-5 ${hasReachedTarget ? 'text-white' : 'text-commission-primary'}`} />
            </div>
            <div>
              <div className={`text-sm ${hasReachedTarget ? 'text-white/90' : 'text-muted-foreground'}`}>
                {t.content.commissionEarned}
              </div>
              <div className={`font-bold text-lg ${hasReachedTarget ? 'text-white' : ''}`}>
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
