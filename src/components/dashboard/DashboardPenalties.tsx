
import React from 'react';
import PenaltyBadges from '@/components/PenaltyBadges';
import { Flag } from 'lucide-react';

interface DashboardPenaltiesProps {
  penalties: Array<{
    id: number;
    reason: string;
    amount: number;
    date: string;
  }>;
  currency: string;
  t: any;
}

const DashboardPenalties: React.FC<DashboardPenaltiesProps> = ({ penalties, currency, t }) => {
  if (penalties.length === 0) return null;
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Flag className="h-5 w-5 mr-2 text-status-danger" />
        {t.common.penalties}
      </h2>
      <PenaltyBadges
        penalties={penalties}
        currency={currency}
      />
    </div>
  );
};

export default DashboardPenalties;
