
// Sample data for the sales dashboard
// In a real app, this would come from an API

// Sales rep data
export const salesRepData = {
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
export const weeklyCommissionData = {
  dateRange: 'May 19, 2025 – May 25, 2025',
  commission: 1644.17,
};

// Growth by volume data
export const growthVolumeData = {
  totalSales: 135000,
  growthPercentage: 18,
  growthTarget: 150000, // Target representing 13% growth
  targetGrowthPercentage: 13,
  currentMonthSales: 50000,
  remainingSalesNeeded: 0,
  commissionEarned: 2224.17,
};

// Payment collection data
export const paymentCollectionData = {
  totalPayments: 10,
  paymentsCollected: 8,
  commissionEarned: 200,
  overduePayments: 2,
  upcomingPayments: 1,
  totalCollected: 40000,
};

// Commission drivers
export const commissionDrivers = [
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

// Penalties
export const penalties = [
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

// Historical performance data
export const historicalData = [
  { period: 'Jan', actual: 30000, target: 35000 },
  { period: 'Feb', actual: 38000, target: 40000 },
  { period: 'Mar', actual: 42000, target: 45000 },
  { period: 'Apr', actual: 48000, target: 45000 },
  { period: 'May', actual: 42500, target: 50000 },
];
