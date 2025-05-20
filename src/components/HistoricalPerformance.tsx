
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Badge } from '@/components/ui/badge';

interface HistoricalData {
  period: string;
  actual: number;
  target: number;
}

interface HistoricalPerformanceProps {
  historicalData: HistoricalData[];
  currency: string;
}

const HistoricalPerformance: React.FC<HistoricalPerformanceProps> = ({
  historicalData,
  currency
}) => {
  // Find best and worst periods
  let bestPeriod = historicalData[0];
  let worstPeriod = historicalData[0];
  
  historicalData.forEach(period => {
    const bestRatio = bestPeriod.actual / bestPeriod.target;
    const worstRatio = worstPeriod.actual / worstPeriod.target;
    const currentRatio = period.actual / period.target;
    
    if (currentRatio > bestRatio) bestPeriod = period;
    if (currentRatio < worstRatio) worstPeriod = period;
  });

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Historical Performance</CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-blue-500">Actual</Badge>
            <Badge variant="outline" className="border-amber-500 text-amber-500">Target</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={historicalData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${currency}${Number(value).toLocaleString()}`, '']} 
                labelFormatter={(label) => `Period: ${label}`} 
              />
              <Legend />
              <Bar dataKey="actual" name="Actual" fill="#9b87f5" />
              <Bar dataKey="target" name="Target" fill="#fcd34d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <span className="text-xs font-medium text-green-700 block mb-1">Best Performance</span>
            <span className="text-sm font-medium">
              {bestPeriod.period}: {currency}{bestPeriod.actual.toLocaleString()} 
              ({Math.round((bestPeriod.actual / bestPeriod.target) * 100)}% of target)
            </span>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <span className="text-xs font-medium text-amber-700 block mb-1">Area for Improvement</span>
            <span className="text-sm font-medium">
              {worstPeriod.period}: {currency}{worstPeriod.actual.toLocaleString()} 
              ({Math.round((worstPeriod.actual / worstPeriod.target) * 100)}% of target)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalPerformance;
