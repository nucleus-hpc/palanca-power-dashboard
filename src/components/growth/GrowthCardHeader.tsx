
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface GrowthCardHeaderProps {
  t: any;
}

const GrowthCardHeader: React.FC<GrowthCardHeaderProps> = ({ t }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-bold text-lg flex items-center">
        <TrendingUp className="h-5 w-5 mr-3 text-commission-primary" />
        {t.headers.growthByVolume}
      </h2>
    </div>
  );
};

export default GrowthCardHeader;
