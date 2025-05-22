
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
  const progressPercentage = Math.min((growthPercentage / (targetGrowthPercentage + 5)) * 100, 100);
  const targetProgressPosition = (targetGrowthPercentage / (targetGrowthPercentage + 5)) * 100;
  
  // Generate markers for additional commission tiers (every 1% after target)
  const additionalMarkers = Array.from({ length: 5 }, (_, i) => {
    const marker = targetGrowthPercentage + (i + 1);
    const position = (marker / (targetGrowthPercentage + 5)) * 100;
    const unlocked = growthPercentage >= marker;
    const reward = 250;
    return { marker, position, unlocked, reward };
  });
  
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
          <div className={`flex items-center text-sm font-medium mt-2 
            ${isGrowthPositive ? 'text-status-success' : 'text-status-danger'}`}>
            {isGrowthPositive ? '+' : ''}{growthPercentage}% {t.common.growth}
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="my-8">
          <div className="text-sm text-muted-foreground mb-3 flex justify-between">
            <span>{t.content.currentProgress}</span>
            <span className="font-medium">{t.content.targetGrowth} {targetGrowthPercentage}%</span>
          </div>
          
          <div className="relative h-10 bg-gray-100 rounded-full overflow-hidden mb-8 shadow-inner">
            <div 
              className={`h-full ${hasReachedTarget ? 'bg-status-success' : 'bg-commission-primary'}`}
              style={{ width: `${progressPercentage}%`, transition: 'width 1s ease-in-out' }}
            ></div>
            
            {/* Target marker - Initial milestone */}
            <div 
              className="absolute top-0 h-full w-0.5 bg-commission-dark" 
              style={{ left: `${targetProgressPosition}%` }}
            >
              <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-commission-dark"></div>
              <div className="absolute -bottom-8 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                {targetGrowthPercentage}% → {currency}1,000.00
              </div>
            </div>
            
            {/* Additional reward markers */}
            {additionalMarkers.map((marker, index) => (
              <div 
                key={index}
                className={`absolute top-0 h-full w-0.5 ${marker.unlocked ? 'bg-status-success' : 'bg-status-neutral'}`}
                style={{ left: `${marker.position}%` }}
              >
                <div 
                  className={`absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 
                    ${marker.unlocked ? 'border-status-success' : 'border-status-neutral'}`}>
                </div>
                <div className="absolute -bottom-8 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                  {marker.marker}% → +{currency}{formatCurrency(marker.reward)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Data points with icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 p-4 rounded-xl flex items-center dark:highlighted-card shadow-sm">
            <div className="bg-gray-100 p-3 rounded-full mr-4 dark:bg-gray-700">
              <Target className="h-5 w-5 text-commission-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t.content.growthTarget} ({targetGrowthPercentage}%)</div>
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
              <div className="text-sm text-muted-foreground">{t.content.remainingNeeded}</div>
              <div className="font-bold">{currency}{formatCurrency(remainingSalesNeeded)}</div>
            </div>
          </div>
          
          {/* Commission earned with shield icon */}
          <div className="bg-gray-50 p-4 rounded-xl flex items-center dark:highlighted-card border border-commission-primary/30 dark:border-commission-primary/20 shadow-sm">
            <div className={`p-3 rounded-full mr-4 
              ${commissionEarned > 0 
                ? 'bg-commission-primary/20' 
                : 'bg-status-neutral dark:bg-gray-700'}`}>
              <Shield className={`h-5 w-5 
                ${commissionEarned > 0 
                  ? 'text-commission-primary' 
                  : 'text-status-neutral'}`} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{t.content.commissionEarned}</div>
              <div className={`font-bold text-lg 
                ${commissionEarned > 0 
                  ? 'text-commission-primary' 
                  : 'text-status-neutral'}`}>
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
