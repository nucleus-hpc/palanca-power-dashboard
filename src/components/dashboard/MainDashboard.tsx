
import React from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import CommissionSummary from '@/components/CommissionSummary';
import DriverCards from '@/components/DriverCards';
import PenaltyBadges from '@/components/PenaltyBadges';
import AchievementSection from '@/components/AchievementSection';
import WeeklyCommissionSummary from '@/components/WeeklyCommissionSummary';
import GrowthByVolumeCard from '@/components/GrowthByVolumeCard';
import PaymentCollectionDriver from '@/components/PaymentCollectionDriver';
import SimulationTool from '@/components/SimulationTool';
import HistoricalPerformance from '@/components/HistoricalPerformance';
import { Flag } from 'lucide-react';
import { getRemainingToGoal, simulateEarnings } from '@/utils/commissionUtils';

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
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  salesRepData,
  weeklyCommissionData,
  growthVolumeData,
  paymentCollectionData,
  commissionDrivers,
  penalties,
  historicalData,
  period,
  setPeriod
}) => {
  // Calculate remaining to next milestone
  const remainingToGoal = getRemainingToGoal(salesRepData.commission, salesRepData.goal);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          name={salesRepData.name}
          routeNumber={salesRepData.routeNumber}
          selectedPeriod={period}
          onPeriodChange={setPeriod}
        />
        
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
            <h2 className="text-xl font-bold">Commission Drivers</h2>
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
              Penalties
            </h2>
            <PenaltyBadges
              penalties={penalties}
              currency={salesRepData.currency}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Simulation Tool</h2>
            <SimulationTool
              currency={salesRepData.currency}
              currentCommission={salesRepData.commission}
              simulateEarnings={simulateEarnings}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Performance History</h2>
            <HistoricalPerformance
              historicalData={historicalData}
              currency={salesRepData.currency}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
