
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

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
  // Available periods (only month and year)
  const periods = [
    { value: 'jan2025', label: 'January 2025' },
    { value: 'feb2025', label: 'February 2025' },
    { value: 'mar2025', label: 'March 2025' },
    { value: 'apr2025', label: 'April 2025' },
    { value: 'may2025', label: 'May 2025' },
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">{name}</h1>
            <p className="text-muted-foreground">Route: {routeNumber}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
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
