
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';
import GrowthCardHeader from './growth/GrowthCardHeader';
import GrowthIndicator from './growth/GrowthIndicator';
import ProgressBarV1 from './growth/ProgressBarV1';
import TotalSales from './growth/TotalSales';
import VolumeStats from './growth/VolumeStats';
import { Calendar } from 'lucide-react';

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
    <Card className="mb-4 overflow-visible rounded-xl shadow-lg">
      <div className="h-1 bg-commission-primary"></div>
      <CardContent className="p-4 overflow-visible">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <GrowthCardHeader t={t} />
          </div>
        </div>
        
        <div className="text-sm px-3 py-1 bg-gray-100 rounded-lg font-medium text-muted-foreground dark:bg-gray-700 flex items-center mt-3 self-end ml-auto w-fit">
          <Calendar className="h-4 w-4 mr-2 text-commission-primary" />
          Este mes
        </div>
        
        <TotalSales 
          totalSales={totalSales}
          hasReachedTarget={hasReachedTarget}
          formatCurrency={formatCurrency}
          currency={currency}
          t={t}
        />
        
        <div className="mt-2 mb-2">
          <GrowthIndicator 
            growthPercentage={growthPercentage}
            targetGrowthPercentage={targetGrowthPercentage}
            hasReachedTarget={hasReachedTarget}
            t={t}
            showTargetText={false}
          />
        </div>
          
        <div className="mb-5 pt-4 pb-8 overflow-visible">
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
