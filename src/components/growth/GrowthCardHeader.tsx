
import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

interface GrowthCardHeaderProps {
  t: any;
}

const GrowthCardHeader: React.FC<GrowthCardHeaderProps> = ({ t }) => {
  return (
    <div className="flex items-center gap-3">
      <h2 className="font-bold text-lg flex items-center">
        <TrendingUp className="h-5 w-5 mr-3 text-commission-primary" />
        {t.headers.growthByVolume}
      </h2>
      <div className="text-xs px-2 py-1 bg-gray-100 rounded-md font-medium text-muted-foreground dark:bg-gray-700 flex items-center">
        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
        Este mes
      </div>
    </div>
  );
};

export default GrowthCardHeader;
