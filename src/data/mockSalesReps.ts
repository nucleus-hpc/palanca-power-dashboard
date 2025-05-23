
import { 
  salesRepData as defaultSalesRepData, 
  weeklyCommissionData as defaultWeeklyData, 
  growthVolumeData as defaultGrowthData,
  paymentCollectionData as defaultPaymentData,
  commissionDrivers as defaultDrivers, 
  penalties as defaultPenalties, 
  historicalData as defaultHistoricalData 
} from './dashboardData';

// Create varied performance levels for different mock sales reps
export const mockSalesReps = [
  {
    id: "rep1",
    name: "Maria Rodriguez",
    routeNumber: "42",
    performanceLevel: "high" as const,
    data: {
      salesRepData: defaultSalesRepData,
      weeklyCommissionData: defaultWeeklyData,
      growthVolumeData: defaultGrowthData,
      paymentCollectionData: defaultPaymentData,
      commissionDrivers: defaultDrivers,
      penalties: defaultPenalties,
      historicalData: defaultHistoricalData
    }
  },
  {
    id: "rep2",
    name: "Carlos Mendez",
    routeNumber: "17",
    performanceLevel: "medium" as const,
    data: {
      salesRepData: {
        ...defaultSalesRepData,
        name: "Carlos Mendez",
        routeNumber: "17",
        commission: 32500,
        goal: 50000,
        levelProgress: 65
      },
      weeklyCommissionData: {
        ...defaultWeeklyData,
        commission: 2150
      },
      growthVolumeData: {
        totalSales: 125000,
        growthPercentage: 10,
        growthTarget: 150000,
        targetGrowthPercentage: 13,
        currentMonthSales: 25000,
        remainingSalesNeeded: 25000,
        commissionEarned: 0
      },
      paymentCollectionData: {
        totalPayments: 12,
        paymentsCollected: 6,
        commissionEarned: 650,
        overduePayments: 1,
        upcomingPayments: 1,
        totalCollected: 130000
      },
      commissionDrivers: defaultDrivers.map(driver => ({
        ...driver,
        currentValue: Math.round(driver.currentValue * 0.8),
        commission: Math.round(driver.commission * 0.8),
        progress: Math.min(Math.round(driver.progress * 0.8), 100)
      })),
      penalties: defaultPenalties,
      historicalData: defaultHistoricalData.map(data => ({
        ...data,
        actual: Math.round(data.actual * 0.8)
      }))
    }
  },
  {
    id: "rep3",
    name: "Ana Gutierrez",
    routeNumber: "29",
    performanceLevel: "low" as const,
    data: {
      salesRepData: {
        ...defaultSalesRepData,
        name: "Ana Gutierrez",
        routeNumber: "29",
        commission: 21500,
        goal: 45000,
        levelProgress: 48
      },
      weeklyCommissionData: {
        ...defaultWeeklyData,
        commission: 1350
      },
      growthVolumeData: {
        totalSales: 95000,
        growthPercentage: -5,
        growthTarget: 135000,
        targetGrowthPercentage: 13,
        currentMonthSales: 22000,
        remainingSalesNeeded: 40000,
        commissionEarned: 0
      },
      paymentCollectionData: {
        totalPayments: 10,
        paymentsCollected: 4,
        commissionEarned: 450,
        overduePayments: 1,
        upcomingPayments: 0,
        totalCollected: 90000
      },
      commissionDrivers: defaultDrivers.map(driver => ({
        ...driver,
        currentValue: Math.round(driver.currentValue * 0.6),
        commission: Math.round(driver.commission * 0.6),
        progress: Math.min(Math.round(driver.progress * 0.6), 100),
        badgeEarned: false
      })),
      penalties: [
        ...defaultPenalties,
        {
          id: 3,
          reason: 'Producto caducado',
          amount: 450,
          date: 'May 12, 2025'
        }
      ],
      historicalData: defaultHistoricalData.map(data => ({
        ...data,
        actual: Math.round(data.actual * 0.6)
      }))
    }
  },
  {
    id: "rep4",
    name: "Luis Fernandez",
    routeNumber: "33",
    performanceLevel: "high" as const,
    data: {
      salesRepData: {
        ...defaultSalesRepData,
        name: "Luis Fernandez",
        routeNumber: "33",
        commission: 48000,
        goal: 45000,
        levelProgress: 100
      },
      weeklyCommissionData: {
        ...defaultWeeklyData,
        commission: 3750
      },
      growthVolumeData: {
        totalSales: 160000,
        growthPercentage: 18,
        growthTarget: 150000,
        targetGrowthPercentage: 13,
        currentMonthSales: 32000,
        remainingSalesNeeded: 0,
        commissionEarned: 2250
      },
      paymentCollectionData: {
        totalPayments: 15,
        paymentsCollected: 14,
        commissionEarned: 1200,
        overduePayments: 3,
        upcomingPayments: 2,
        totalCollected: 240000
      },
      commissionDrivers: defaultDrivers.map(driver => ({
        ...driver,
        currentValue: Math.round(driver.currentValue * 1.2),
        commission: Math.round(driver.commission * 1.2),
        progress: 100,
        badgeEarned: true
      })),
      penalties: [],
      historicalData: defaultHistoricalData.map(data => ({
        ...data,
        actual: Math.round(data.actual * 1.2)
      }))
    }
  }
];
