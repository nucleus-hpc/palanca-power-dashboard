
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface Penalty {
  id: number;
  reason: string;
  amount: number;
  date: string;
}

interface PenaltiesSectionProps {
  penalties: Penalty[];
  currency: string;
}

const PenaltiesSection: React.FC<PenaltiesSectionProps> = ({ penalties, currency }) => {
  if (!penalties.length) {
    return (
      <Card className="mb-6 border-dashed border-green-200 bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <span className="text-status-success">No Penalties</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-status-success">
            Great job! You don't have any penalties for this period.
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalPenalties = penalties.reduce((total, penalty) => total + penalty.amount, 0);

  return (
    <Card className="mb-6 border-status-danger/20 bg-red-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <AlertTriangle className="h-5 w-5 text-status-danger mr-2" />
          <span className="text-status-danger">Penalties ({penalties.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {penalties.map((penalty) => (
            <div key={penalty.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-100">
              <div>
                <p className="font-medium text-commission-dark">{penalty.reason}</p>
                <p className="text-xs text-muted-foreground">{penalty.date}</p>
              </div>
              <span className="font-bold text-status-danger">-{currency}{penalty.amount.toLocaleString()}</span>
            </div>
          ))}
          
          <div className="flex justify-between items-center pt-2 border-t border-red-100 mt-2">
            <span className="font-medium">Total Penalties</span>
            <span className="font-bold text-status-danger">-{currency}{totalPenalties.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PenaltiesSection;
