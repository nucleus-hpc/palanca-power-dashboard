
import React, { useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import ProgressOverview from '@/components/ProgressOverview';
import CommissionDriver from '@/components/CommissionDriver';
import PenaltiesSection from '@/components/PenaltiesSection';
import SimulationTool from '@/components/SimulationTool';
import HistoricalPerformance from '@/components/HistoricalPerformance';
import MotivationMessage from '@/components/MotivationMessage';

const Index = () => {
  const [period, setPeriod] = useState('may2025');

  // Sample data (in a real app, this would come from an API)
  const salesRepData = {
    name: 'Maria Rodriguez',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    commission: 42500,
    goal: 50000,
    currency: 'Q',
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
  
  // Calculate motivation message
  const getMotivationMessage = () => {
    const remainingToGoal = salesRepData.goal - salesRepData.commission;
    
    if (remainingToGoal <= 0) {
      return {
        message: 'Congratulations! You've reached your goal. Keep pushing for the bonus tier!',
        type: 'success' as const
      };
    } else if (remainingToGoal <= 3500) {
      return {
        message: `You're only ${salesRepData.currency}${remainingToGoal.toLocaleString()} away from reaching your goal!`,
        type: 'info' as const
      };
    } else {
      const nextDriver = commissionDrivers.find(driver => 
        (driver.currentValue / driver.goal) < 0.9
      );
      
      if (nextDriver) {
        return {
          message: `Focus on ${nextDriver.name} to boost your commission by ${salesRepData.currency}${nextDriver.nextCommission.toLocaleString()}!`,
          type: 'warning' as const
        };
      }
      
      return {
        message: `You're making good progress! Keep it up to reach your ${salesRepData.currency}${salesRepData.goal.toLocaleString()} goal.`,
        type: 'info' as const
      };
    }
  };
  
  const motivationData = getMotivationMessage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          name={salesRepData.name}
          avatarUrl={salesRepData.avatarUrl}
          selectedPeriod={period}
          onPeriodChange={setPeriod}
        />
        
        <ProgressOverview
          totalCommission={salesRepData.commission}
          goal={salesRepData.goal}
          currency={salesRepData.currency}
        />
        
        <MotivationMessage
          message={motivationData.message}
          type={motivationData.type}
        />
        
        <h2 className="text-xl font-bold mb-4">Commission Drivers</h2>
        
        <div className="space-y-6">
          {commissionDrivers.map(driver => (
            <CommissionDriver
              key={driver.id}
              name={driver.name}
              currentValue={driver.currentValue}
              goal={driver.goal}
              commission={driver.commission}
              nextThreshold={driver.nextThreshold}
              nextCommission={driver.nextCommission}
              currency={salesRepData.currency}
              trend={driver.trend}
              tip={driver.tip}
            />
          ))}
        </div>
        
        <h2 className="text-xl font-bold mb-4 mt-8">Penalties</h2>
        <PenaltiesSection
          penalties={penalties}
          currency={salesRepData.currency}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
