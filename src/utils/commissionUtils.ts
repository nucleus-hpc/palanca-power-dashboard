
// Utility functions for commission calculations

/**
 * Simulates earnings based on sales count and average value
 */
export const simulateEarnings = (salesCount: number, salesAvgValue: number): number => {
  // Simple simulation logic - in a real app this would be more complex
  const totalSalesValue = salesCount * salesAvgValue;
  // Assume 7% commission on sales
  return Math.round(totalSalesValue * 0.07);
};

/**
 * Calculate remaining amount to reach goal
 */
export const getRemainingToGoal = (commission: number, goal: number): number => {
  const remainingToGoal = goal - commission;
  return remainingToGoal > 0 ? remainingToGoal : 0;
};
