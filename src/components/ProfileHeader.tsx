
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/i18n/LanguageContext';

interface ProfileHeaderProps {
  name: string;
  routeNumber: string;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  routeNumber,
  selectedPeriod,
  onPeriodChange,
}) => {
  const { t } = useLanguage();

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">{name}</h1>
            <p className="text-muted-foreground">{t.common.route}: {routeNumber}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={`${t.common.select} ${t.common.period}`} />
              </SelectTrigger>
              <SelectContent>
                {t.periods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
