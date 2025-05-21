
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircleDot, TrendingUp } from 'lucide-react';

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
    return { position, unlocked };
  });

  return (
    <Card className="mb-6 overflow-hidden">
      <div className="h-1 bg-commission-primary"></div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-commission-primary" />
            <h2 className="font-bold text-lg">Growth by Volume</h2>
          </div>
          <div className={`flex items-center gap-1 font-bold ${isGrowthPositive ? 'text-green-600' : 'text-status-danger'}`}>
            {isGrowthPositive ? '+' : ''}{growthPercentage}%
          </div>
        </div>
        
        <div className="mt-4 mb-6">
          <div className="text-sm text-muted-foreground mb-1 flex justify-between">
            <span>Current Growth</span>
            <span className="font-medium">Target: {targetGrowthPercentage}% Growth</span>
          </div>
          
          <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${hasReachedTarget ? 'bg-green-500' : 'bg-commission-primary'}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
            
            {/* Target marker */}
            <div 
              className="absolute top-0 h-full w-0.5 bg-gray-800" 
              style={{ left: `${targetProgressPosition}%` }}
            >
              <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 border-gray-800"></div>
              <div className="absolute -bottom-6 -left-4 text-xs font-medium">
                {targetGrowthPercentage}%
              </div>
            </div>
            
            {/* Additional reward markers */}
            {additionalMarkers.map((marker, index) => (
              <div 
                key={index}
                className={`absolute top-0 h-full w-0.5 ${marker.unlocked ? 'bg-green-500' : 'bg-gray-400'}`}
                style={{ left: `${marker.position}%` }}
              >
                <div 
                  className={`absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-white border-2 
                    ${marker.unlocked ? 'border-green-500' : 'border-gray-400'}`}>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-xs mt-6 mb-2">
            <div className="flex items-center gap-1">
              <CircleDot className="h-3 w-3 text-commission-primary" />
              <span>Initial Bonus: {currency}1,000 at {targetGrowthPercentage}%</span>
            </div>
            <div className="flex items-center gap-1">
              <CircleDot className="h-3 w-3 text-green-500" />
              <span>+{currency}250 per 1% above {targetGrowthPercentage}%</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Sales</div>
            <div className="font-bold text-lg">{currency}{totalSales.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Growth Target</div>
            <div className="font-bold text-lg">{currency}{growthTarget.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Current Month</div>
            <div className="font-bold text-lg">{currency}{currentMonthSales.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Remaining Needed</div>
            <div className="font-bold text-lg">{currency}{remainingSalesNeeded.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="mt-4 bg-commission-light p-4 rounded-lg border border-commission-primary/30">
          <div className="text-sm text-muted-foreground">Commission Earned</div>
          <div className="font-bold text-xl text-commission-primary">{currency}{commissionEarned.toLocaleString()}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthByVolumeCard;
