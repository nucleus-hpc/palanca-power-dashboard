
import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import CommissionSummary from '@/components/CommissionSummary';
import DriverCards from '@/components/DriverCards';
import PenaltyBadges from '@/components/PenaltyBadges';
import WeeklyCommissionSummary from '@/components/WeeklyCommissionSummary';
import GrowthByVolumeCard from '@/components/GrowthByVolumeCard';
import PaymentCollectionDriver from '@/components/PaymentCollectionDriver';
import { Flag } from 'lucide-react';
import { getRemainingToGoal } from '@/utils/commissionUtils';
import { useLanguage } from '@/i18n/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MainDashboardProps {
  salesRepData: {
    name: string;
    avatarUrl: string;
    routeNumber: string;
    commission: number;
    goal: number;
    currency: string;
    level: string;
    nextLevel: string;
    levelProgress: number;
  };
  weeklyCommissionData: {
    dateRange: string;
    commission: number;
  };
  growthVolumeData: {
    totalSales: number;
    growthPercentage: number;
    growthTarget: number;
    targetGrowthPercentage: number;
    currentMonthSales: number;
    remainingSalesNeeded: number;
    commissionEarned: number;
  };
  paymentCollectionData: {
    totalPayments: number;
    paymentsCollected: number;
    commissionEarned: number;
  };
  commissionDrivers: Array<{
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
    trend: Array<{ month: string; value: number }>;
    tip: string;
  }>;
  penalties: Array<{
    id: number;
    reason: string;
    amount: number;
    date: string;
  }>;
  historicalData: Array<{
    period: string;
    actual: number;
    target: number;
  }>;
  period: string;
  setPeriod: (period: string) => void;
  allSalesReps: Array<{
    id: string;
    name: string;
    routeNumber: string;
    performanceLevel: 'low' | 'medium' | 'high';
  }>;
  currentSalesRepId: string;
  onSalesRepChange: (id: string) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  salesRepData,
  weeklyCommissionData,
  growthVolumeData,
  paymentCollectionData,
  commissionDrivers,
  penalties,
  period,
  setPeriod,
  allSalesReps,
  currentSalesRepId,
  onSalesRepChange
}) => {
  const { t } = useLanguage();
  
  // Calculate remaining to next milestone
  const remainingToGoal = getRemainingToGoal(salesRepData.commission, salesRepData.goal);

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-background/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-commission-dark dark:text-white">Comisiones</h1>
          <Select value={currentSalesRepId} onValueChange={onSalesRepChange}>
            <SelectTrigger className="w-[240px] bg-white dark:bg-sidebar-accent shadow-md">
              <SelectValue placeholder="Seleccionar vendedor" />
            </SelectTrigger>
            <SelectContent>
              {allSalesReps.map((rep) => (
                <SelectItem key={rep.id} value={rep.id}>
                  {rep.name} - Ruta {rep.routeNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-6">
          <ProfileHeader
            name={salesRepData.name}
            routeNumber={salesRepData.routeNumber}
            selectedPeriod={period}
            onPeriodChange={setPeriod}
          />
        </div>
        
        {/* Weekly Commission Summary */}
        <div className="mt-6">
          <WeeklyCommissionSummary
            dateRange={weeklyCommissionData.dateRange}
            commission={weeklyCommissionData.commission}
            currency={salesRepData.currency}
          />
        </div>
        
        {/* Growth by Volume Card */}
        <div className="mt-6">
          <GrowthByVolumeCard
            totalSales={growthVolumeData.totalSales}
            growthPercentage={growthVolumeData.growthPercentage}
            growthTarget={growthVolumeData.growthTarget}
            targetGrowthPercentage={growthVolumeData.targetGrowthPercentage}
            currentMonthSales={growthVolumeData.currentMonthSales}
            remainingSalesNeeded={growthVolumeData.remainingSalesNeeded}
            commissionEarned={growthVolumeData.commissionEarned}
            currency={salesRepData.currency}
          />
        </div>
        
        {/* Payment Collection Driver */}
        <div className="mt-6">
          <PaymentCollectionDriver
            totalPayments={paymentCollectionData.totalPayments}
            paymentsCollected={paymentCollectionData.paymentsCollected}
            commissionEarned={paymentCollectionData.commissionEarned}
            currency={salesRepData.currency}
          />
        </div>
        
        <CommissionSummary
          totalCommission={salesRepData.commission}
          goal={salesRepData.goal}
          currency={salesRepData.currency}
          remainingToGoal={remainingToGoal}
        />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{t.headers.commissionDrivers}</h2>
          </div>
          
          <DriverCards 
            drivers={commissionDrivers}
            currency={salesRepData.currency}
          />
        </div>
        
        {penalties.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Flag className="h-5 w-5 mr-2 text-status-danger" />
              {t.common.penalties}
            </h2>
            <PenaltyBadges
              penalties={penalties}
              currency={salesRepData.currency}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
