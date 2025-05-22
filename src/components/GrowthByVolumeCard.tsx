import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Target, 
  CalendarDays, 
  ArrowRight, 
  Shield 
} from 'lucide-react';

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

  return (
    <Card className="mb-6 overflow-hidden">
      <div className="h-1 bg-commission-primary"></div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-commission-primary" />
            Growth by Volume
          </h2>
        </div>
        
        {/* Primary highlight - Total Sales */}
        <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:highlighted-card">
          <div className="text-sm text-muted-foreground">Total Sales this Quarter</div>
          <div className={`font-bold text-2xl ${hasReachedTarget ? 'text-status-success' : 'text-status-danger'}`}>
            {currency}{totalSales.toLocaleString()}
          </div>
          <div className={`flex items-center text-sm font-medium mt-1 
            ${isGrowthPositive ? 'text-status-success' : 'text-status-danger'}`}>
            {isGrowthPositive ? '+' : ''}{growthPercentage}% Growth
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="mt-5 mb-6">
          <div className="text-sm text-muted-foreground mb-2 flex justify-between">
            <span>Current Progress</span>
            <span className="font-medium">Target: {targetGrowthPercentage}% Growth</span>
          </div>
          
          <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden mb-6">
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
                {targetGrowthPercentage}% → {currency}1,000
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
                  {marker.marker}% → +{currency}{marker.reward}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Data points with icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 p-3 rounded-lg flex items-center dark:highlighted-card">
            <div className="bg-gray-100 p-2 rounded-full mr-3 dark:bg-gray-700">
              <Target className="h-5 w-5 text-commission-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Growth Target ({targetGrowthPercentage}%)</div>
              <div className="font-bold">{currency}{growthTarget.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg flex items-center dark:highlighted-card">
            <div className="bg-gray-100 p-2 rounded-full mr-3 dark:bg-gray-700">
              <CalendarDays className="h-5 w-5 text-commission-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Current Month Sales</div>
              <div className="font-bold">{currency}{currentMonthSales.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg flex items-center dark:highlighted-card">
            <div className="bg-gray-100 p-2 rounded-full mr-3 dark:bg-gray-700">
              <ArrowRight className="h-5 w-5 text-commission-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Remaining Needed</div>
              <div className="font-bold">{currency}{remainingSalesNeeded.toLocaleString()}</div>
            </div>
          </div>
          
          {/* Commission earned with shield icon */}
          <div className="bg-gray-50 p-3 rounded-lg flex items-center dark:highlighted-card border border-commission-primary/30 dark:border-commission-primary/20">
            <div className={`p-2 rounded-full mr-3 
              ${commissionEarned > 0 
                ? 'bg-commission-primary/20' 
                : 'bg-status-neutral dark:bg-gray-700'}`}>
              <Shield className={`h-5 w-5 
                ${commissionEarned > 0 
                  ? 'text-commission-primary' 
                  : 'text-status-neutral'}`} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Commission Earned</div>
              <div className={`font-bold text-lg 
                ${commissionEarned > 0 
                  ? 'text-commission-primary' 
                  : 'text-status-neutral'}`}>
                {currency}{commissionEarned.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthByVolumeCard;
