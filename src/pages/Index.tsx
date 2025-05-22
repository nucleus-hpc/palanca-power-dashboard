
import React, { useState } from 'react';
import MainDashboard from '@/components/dashboard/MainDashboard';
import { 
  salesRepData, 
  weeklyCommissionData, 
  growthVolumeData,
  paymentCollectionData,
  commissionDrivers, 
  penalties, 
  historicalData 
} from '@/data/dashboardData';

const Index = () => {
  const [period, setPeriod] = useState('may2025');

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
    />
  );
};

export default Index;
