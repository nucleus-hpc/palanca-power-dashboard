
import React, { useState } from 'react';
import MainDashboard from '@/components/dashboard/MainDashboard';
import { 
  salesRepData as defaultSalesRepData, 
  weeklyCommissionData as defaultWeeklyData, 
  growthVolumeData as defaultGrowthData,
  paymentCollectionData as defaultPaymentData,
  commissionDrivers as defaultDrivers, 
  penalties as defaultPenalties, 
  historicalData as defaultHistoricalData 
} from '@/data/dashboardData';
import { mockSalesReps } from '@/data/mockSalesReps';

const Index = () => {
  const [period, setPeriod] = useState('may2025');
  const [currentSalesRepId, setCurrentSalesRepId] = useState(mockSalesReps[0].id);
  
  // Get current sales rep data based on the selected ID
  const currentRep = mockSalesReps.find(rep => rep.id === currentSalesRepId) || mockSalesReps[0];
  
  // Use the appropriate data based on the selected sales rep
  const salesRepData = currentRep.data.salesRepData;
  const weeklyCommissionData = currentRep.data.weeklyCommissionData;
  const growthVolumeData = currentRep.data.growthVolumeData;
  const paymentCollectionData = currentRep.data.paymentCollectionData;
  const commissionDrivers = currentRep.data.commissionDrivers;
  const penalties = currentRep.data.penalties;
  const historicalData = currentRep.data.historicalData;
  
  // Handler for changing the selected sales rep
  const handleSalesRepChange = (id: string) => {
    setCurrentSalesRepId(id);
  };

  return (
    <MainDashboard
      salesRepData={salesRepData}
      weeklyCommissionData={weeklyCommissionData}
      growthVolumeData={growthVolumeData}
      paymentCollectionData={paymentCollectionData}
      commissionDrivers={commissionDrivers}
      penalties={penalties}
      historicalData={historicalData}
      period={period}
      setPeriod={setPeriod}
      allSalesReps={mockSalesReps}
      currentSalesRepId={currentSalesRepId}
      onSalesRepChange={handleSalesRepChange}
    />
  );
};

export default Index;
