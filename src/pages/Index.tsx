
import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import CommissionSummary from '@/components/CommissionSummary';
import DriverCards from '@/components/DriverCards';
import PenaltyBadges from '@/components/PenaltyBadges';
import AchievementSection from '@/components/AchievementSection';
import SimulationTool from '@/components/SimulationTool';
import HistoricalPerformance from '@/components/HistoricalPerformance';
import WeeklyCommissionSummary from '@/components/WeeklyCommissionSummary';
import GrowthByVolumeCard from '@/components/GrowthByVolumeCard';
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Flag } from 'lucide-react';

const Index = () => {
  const [period, setPeriod] = useState('may2025');

  // Sample data (in a real app, this would come from an API)
  const salesRepData = {
    name: 'Maria Rodriguez',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    routeNumber: '42',
    commission: 42500,
    goal: 50000,
    currency: 'Q',
    level: 'Silver Seller',
    nextLevel: 'Gold Seller',
    levelProgress: 85,
  };
  
  // Weekly commission data
  const weeklyCommissionData = {
    dateRange: 'May 19, 2025 – May 25, 2025',
    commission: 3250,
  };
  
  // Growth by volume data
  const growthVolumeData = {
    totalSales: 135000,
    growthPercentage: 15,
    growthTarget: 150000, // Target representing 13% growth
    targetGrowthPercentage: 13,
    currentMonthSales: 28500,
    remainingSalesNeeded: 15000,
    commissionEarned: 1500, // 1000 + (2 * 250) for 2% above target
  };
  
  const commissionDrivers = [
    {
      id: 1,
      name: 'Sales Growth',
      currentValue: 35000,
      goal: 48000,
      commission: 2500,
      nextThreshold: 39000,
      nextCommission: 500,
      progress: 73,
      icon: 'trending-up',
      badgeEarned: true,
      trend: [
        { month: 'Jan', value: 10000 },
        { month: 'Feb', value: 15000 },
        { month: 'Mar', value: 20000 },
        { month: 'Apr', value: 28000 },
        { month: 'May', value: 35000 },
      ],
      tip: 'Focus on existing customers to upsell premium packages for faster growth.'
    },
    {
      id: 2,
      name: 'New Clients',
      currentValue: 12,
      goal: 15,
      commission: 1800,
      nextThreshold: 13,
      nextCommission: 300,
      progress: 80,
      icon: 'flag',
      badgeEarned: true,
      trend: [
        { month: 'Jan', value: 3 },
        { month: 'Feb', value: 5 },
        { month: 'Mar', value: 7 },
        { month: 'Apr', value: 10 },
        { month: 'May', value: 12 },
      ],
      tip: 'Leverage referrals from your existing client base to reach your goal faster.'
    },
    {
      id: 3,
      name: 'Retention Rate',
      currentValue: 92,
      goal: 95,
      commission: 2000,
      nextThreshold: 93,
      nextCommission: 500,
      progress: 97,
      icon: 'star',
      badgeEarned: false,
      trend: [
        { month: 'Jan', value: 89 },
        { month: 'Feb', value: 91 },
        { month: 'Mar', value: 90 },
        { month: 'Apr', value: 91 },
        { month: 'May', value: 92 },
      ],
      tip: 'Schedule quarterly review meetings with clients to address concerns early.'
    }
  ];
  
  const penalties = [
    {
      id: 1,
      reason: 'Missing documentation',
      amount: 350,
      date: 'May 10, 2025'
    },
    {
      id: 2,
      reason: 'Late submission',
      amount: 200,
      date: 'May 15, 2025'
    }
  ];
  
  const historicalData = [
    { period: 'Jan', actual: 30000, target: 35000 },
    { period: 'Feb', actual: 38000, target: 40000 },
    { period: 'Mar', actual: 42000, target: 45000 },
    { period: 'Apr', actual: 48000, target: 45000 },
    { period: 'May', actual: 42500, target: 50000 },
  ];
  
  // Logic for simulation
  const simulateEarnings = (salesCount: number, salesAvgValue: number) => {
    // Simple simulation logic - in a real app this would be more complex
    const totalSalesValue = salesCount * salesAvgValue;
    // Assume 7% commission on sales
    return Math.round(totalSalesValue * 0.07);
  };
  
  // Calculate remaining to next milestone
  const getRemainingToGoal = () => {
    const remainingToGoal = salesRepData.goal - salesRepData.commission;
    return remainingToGoal > 0 ? remainingToGoal : 0;
  };

  // Calculate total achievements
  const totalAchievements = commissionDrivers.filter(driver => driver.badgeEarned).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start">
          <ProfileHeader
            name={salesRepData.name}
            avatarUrl={salesRepData.avatarUrl}
            routeNumber={salesRepData.routeNumber}
            selectedPeriod={period}
            onPeriodChange={setPeriod}
            level={salesRepData.level}
            levelProgress={salesRepData.levelProgress}
            nextLevel={salesRepData.nextLevel}
          />
          
          <div className="hidden md:flex items-center space-x-2">
            <Badge variant="outline" className="bg-commission-light border-commission-primary text-commission-primary px-3 py-1.5">
              <Trophy className="h-4 w-4 mr-1" /> Level {salesRepData.levelProgress}%
            </Badge>
            <Badge variant="outline" className="bg-commission-light border-commission-primary text-commission-primary px-3 py-1.5">
              <Award className="h-4 w-4 mr-1" /> {totalAchievements} Badges
            </Badge>
          </div>
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
        
        <CommissionSummary
          totalCommission={salesRepData.commission}
          goal={salesRepData.goal}
          currency={salesRepData.currency}
          remainingToGoal={getRemainingToGoal()}
        />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Commission Drivers</h2>
            <Badge className="bg-commission-primary">Earn badges!</Badge>
          </div>
          
          <DriverCards 
            drivers={commissionDrivers}
            currency={salesRepData.currency}
          />
        </div>
        
        <AchievementSection 
          drivers={commissionDrivers}
          level={salesRepData.level}
          nextLevel={salesRepData.nextLevel}
          levelProgress={salesRepData.levelProgress}
        />
        
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

export default Index;
