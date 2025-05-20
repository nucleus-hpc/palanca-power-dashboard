
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Penalty {
  id: number;
  reason: string;
  amount: number;
  date: string;
}

interface PenaltyBadgesProps {
  penalties: Penalty[];
  currency: string;
}

const PenaltyBadges: React.FC<PenaltyBadgesProps> = ({ penalties, currency }) => {
  const totalPenalties = penalties.reduce((total, penalty) => total + penalty.amount, 0);

  return (
    <Card className="mb-6 overflow-hidden border-status-danger/20">
      <div className="h-1 bg-status-danger"></div>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-3">
          {penalties.map((penalty) => (
            <Badge key={penalty.id} variant="outline" className="px-3 py-2 border-status-danger flex items-center gap-2">
              <AlertTriangle className="h-3 w-3 text-status-danger" />
              <div className="flex flex-col">
                <span className="text-xs">{penalty.reason}</span>
                <span className="font-bold text-status-danger">-{currency}{penalty.amount}</span>
              </div>
            </Badge>
          ))}
          
          <Badge className="bg-status-danger text-white px-3 py-2">
            Total: -{currency}{totalPenalties}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default PenaltyBadges;
