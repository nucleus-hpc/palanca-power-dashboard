
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';
import GrowthCardHeader from './growth/GrowthCardHeader';
import GrowthIndicator from './growth/GrowthIndicator';
import ProgressBarV1 from './growth/ProgressBarV1';
import TotalSales from './growth/TotalSales';
import VolumeStats from './growth/VolumeStats';

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
  
  // Format numbers with two decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-GT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  return (
    <Card className="mb-6 overflow-visible rounded-xl shadow-lg">
      <div className="h-1 bg-commission-primary"></div>
      <CardContent className="p-6 overflow-visible">
        <GrowthCardHeader t={t} />
        
        {/* Total Sales Card - At the top */}
        <TotalSales 
          totalSales={totalSales}
          hasReachedTarget={hasReachedTarget}
          formatCurrency={formatCurrency}
          currency={currency}
          t={t}
        />
        
        {/* Main Growth Percentage Indicator */}
        <div className="mt-4 mb-6">
          <GrowthIndicator 
            growthPercentage={growthPercentage}
            targetGrowthPercentage={targetGrowthPercentage}
            hasReachedTarget={hasReachedTarget}
            t={t}
          />
        </div>
          
        {/* Progress Bar with Dynamic Milestone Spacing - Reduced vertical margins */}
        <div className="mb-8 pt-16 pb-6 overflow-visible">
          <ProgressBarV1 
            growthPercentage={growthPercentage}
            targetGrowthPercentage={targetGrowthPercentage}
            hasReachedTarget={hasReachedTarget}
            lowestVisibleMilestone={lowestVisibleMilestone}
            highestVisibleMilestone={highestVisibleMilestone}
            calculatePosition={calculatePosition}
            formatCurrency={formatCurrency}
            currency={currency}
          />
        </div>
        
        {/* Data points with icons */}
        <VolumeStats 
          hasReachedTarget={hasReachedTarget}
          targetGrowthPercentage={targetGrowthPercentage}
          growthTarget={growthTarget}
          currentMonthSales={currentMonthSales}
          remainingSalesNeeded={remainingSalesNeeded}
          commissionEarned={commissionEarned}
          formatCurrency={formatCurrency}
          currency={currency}
          t={t}
        />
      </CardContent>
    </Card>
  );
};

export default GrowthByVolumeCard;
