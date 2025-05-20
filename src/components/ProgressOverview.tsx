
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, AlertTriangle, CircleX } from 'lucide-react';

interface ProgressOverviewProps {
  totalCommission: number;
  goal: number;
  currency: string;
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  totalCommission,
  goal,
  currency
}) => {
  const progress = Math.min(Math.round((totalCommission / goal) * 100), 100);
  
  // Determine status based on progress
  let status: 'success' | 'warning' | 'danger' = 'danger';
  if (progress >= 85) {
    status = 'success';
  } else if (progress >= 60) {
    status = 'warning';
  }
  
  const statusText = status === 'success' ? 'On Track' : status === 'warning' ? 'Close' : 'At Risk';
  
  const StatusIcon = {
    success: CircleCheck,
    warning: AlertTriangle,
    danger: CircleX
  }[status];

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Total Commission</span>
            <span className="text-3xl font-bold text-commission-dark">{currency}{totalCommission.toLocaleString()}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Period Goal</span>
            <span className="text-3xl font-bold text-commission-dark">{currency}{goal.toLocaleString()}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Status</span>
            <div className="flex items-center gap-1">
              <StatusIcon className={`h-5 w-5 text-status-${status}`} />
              <span className={`text-xl font-medium text-status-${status}`}>{statusText}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="relative pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-commission-dark">
                  {progress}% Complete
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-commission-dark">
                  {currency}{totalCommission.toLocaleString()} of {currency}{goal.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200 mt-1">
              <div 
                style={{ width: `${progress}%` }} 
                className={`animate-progress-fill shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-status-${status}`}>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
