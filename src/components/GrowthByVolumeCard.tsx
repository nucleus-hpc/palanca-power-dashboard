
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';
import GrowthCardHeader from './growth/GrowthCardHeader';
import GrowthIndicator from './growth/GrowthIndicator';
import ProgressBarV1 from './growth/ProgressBarV1';
import TotalSales from './growth/TotalSales';
import VolumeStats from './growth/VolumeStats';
import DetailsButton from '@/components/ui/details-button';
import { Calendar, CreditCard } from 'lucide-react';

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
            <div className="text-xs px-2 py-1 bg-gray-100 rounded-md font-medium text-muted-foreground dark:bg-gray-700 flex items-center ml-3">
              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
              Este mes
            </div>
          </div>
        </div>
        
        <TotalSales 
          totalSales={totalSales}
          hasReachedTarget={hasReachedTarget}
          formatCurrency={formatCurrency}
          currency={currency}
          t={t}
          growthPercentage={growthPercentage}
        />
        
        <div className="mt-6 mb-8">
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
        
        {/* Commission description section */}
        <div className="bg-gray-50 p-3 rounded-xl flex items-center dark:highlighted-card shadow-sm mb-4">
          <div className="bg-gray-100 p-3 rounded-full mr-4 dark:bg-gray-700">
            <CreditCard className="h-5 w-5 text-commission-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Descripción de comisión</div>
            <div className="font-bold">Recibe Q1,000.00 al llegar al punto de activación (13%). Por cada porcentaje adicional, recibe +Q250.00</div>
          </div>
        </div>
        
        {/* Caption */}
        <div className="text-xs text-muted-foreground italic mb-4">
          Los pedidos tipo Negociación Especial o Negociación para Crecer no aplican a las ventas totales para el cálculo de esta comisión
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
