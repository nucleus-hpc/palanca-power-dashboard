
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CommissionDriverProps {
  name: string;
  currentValue: number;
  goal: number;
  commission: number;
  nextThreshold: number;
  nextCommission: number;
  currency: string;
  trend: Array<{ month: string; value: number }>;
  tip: string;
}

const CommissionDriver: React.FC<CommissionDriverProps> = ({
  name,
  currentValue,
  goal,
  commission,
  nextThreshold,
  nextCommission,
  currency,
  trend,
  tip
}) => {
  const progress = Math.round((currentValue / goal) * 100);
  
  // Determine status based on progress
  let statusColor = 'text-status-danger';
  if (progress >= 85) {
    statusColor = 'text-status-success';
  } else if (progress >= 60) {
    statusColor = 'text-status-warning';
  }
  
  // Calculate if the trend is positive
  const isPositiveTrend = trend.length >= 2 && 
    trend[trend.length - 1].value > trend[trend.length - 2].value;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-sm">{tip}</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex flex-col mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current</span>
                <div className="flex items-center">
                  {isPositiveTrend ? (
                    <TrendingUp className="h-4 w-4 text-status-success mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-status-danger mr-1" />
                  )}
                  <span className={isPositiveTrend ? 'text-status-success text-xs' : 'text-status-danger text-xs'}>
                    {isPositiveTrend ? 'Increasing' : 'Decreasing'}
                  </span>
                </div>
              </div>
              <span className="text-2xl font-bold">{currency}{currentValue.toLocaleString()}</span>
            </div>
            
            <div className="flex flex-col mb-4">
              <span className="text-sm text-muted-foreground">Goal</span>
              <span className="text-2xl font-bold">{currency}{goal.toLocaleString()}</span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Progress</span>
                <span className={`text-sm font-medium ${statusColor}`}>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`rounded-full h-2 ${
                    progress >= 85 ? 'bg-status-success' : progress >= 60 ? 'bg-status-warning' : 'bg-status-danger'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex flex-col mb-2">
              <span className="text-sm text-muted-foreground">Commission Earned</span>
              <span className="text-xl font-bold text-commission-primary">{currency}{commission.toLocaleString()}</span>
            </div>
            
            <div className="p-3 bg-commission-light rounded-lg">
              <span className="text-xs font-medium block mb-1">Next Threshold</span>
              <span className="text-sm">
                Reach {currency}{nextThreshold.toLocaleString()} to earn{' '}
                <span className="font-bold text-commission-primary">{currency}{nextCommission.toLocaleString()}</span> more
              </span>
            </div>
          </div>
          
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${currency}${Number(value).toLocaleString()}`, 'Value']} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#F26724" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionDriver;
