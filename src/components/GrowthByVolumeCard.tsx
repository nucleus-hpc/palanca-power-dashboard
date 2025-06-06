
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n/LanguageContext';
import GrowthCardHeader from './growth/GrowthCardHeader';
import GrowthIndicator from './growth/GrowthIndicator';
import ProgressBarV1 from './growth/ProgressBarV1';
import TotalSales from './growth/TotalSales';
import VolumeStats from './growth/VolumeStats';
import DetailsButton from '@/components/ui/details-button';
import { Calendar, CreditCard, Pencil } from 'lucide-react';

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
    <Card className="mb-4 overflow-visible rounded-xl border-0">
      <CardContent className="p-4 overflow-visible">
        <div className="mb-6">
          <GrowthCardHeader t={t} />
        </div>
        
        <TotalSales 
          totalSales={156500}
          hasReachedTarget={hasReachedTarget}
          formatCurrency={formatCurrency}
          currency={currency}
          t={t}
          growthPercentage={growthPercentage}
        />
        
        <div className="my-8">
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
        
        {/* Commission description section with increased top margin */}
        <div className="bg-gray-50 p-3 rounded-xl flex items-center dark:highlighted-card shadow-sm mb-6 mt-12 border border-[#D1CFD7]">
          <div className="bg-gray-100 p-3 rounded-full mr-4 dark:bg-gray-700">
            <Pencil className="h-5 w-5 text-commission-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Descripción de comisión</div>
            <div className="text-sm">Recibe Q1,000.00 al llegar al punto de activación (13%). Por cada porcentaje adicional, recibe +Q250.00</div>
          </div>
        </div>
        
        <VolumeStats 
          hasReachedTarget={hasReachedTarget}
          targetGrowthPercentage={targetGrowthPercentage}
          growthTarget={growthTarget}
          currentMonthSales={50000}
          remainingSalesNeeded={0}
          commissionEarned={2224.17}
          formatCurrency={formatCurrency}
          currency={currency}
          t={t}
        />
        
        {/* Caption moved to the bottom */}
        <div className="text-xs text-muted-foreground italic mt-6">
          Los pedidos tipo Negociación Especial o Negociación para Crecer no aplican a las ventas totales para el cálculo de esta comisión
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthByVolumeCard;
