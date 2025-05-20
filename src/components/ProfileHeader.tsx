
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfileHeaderProps {
  name: string;
  avatarUrl: string;
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  avatarUrl,
  selectedPeriod,
  onPeriodChange
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-16 w-16 border-2 border-commission-primary">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-commission-primary text-white text-xl">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-commission-dark">{name}</h1>
          <p className="text-sm text-muted-foreground">Sales Representative</p>
        </div>
      </div>
      
      <div className="w-full md:w-auto">
        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="may2025">May 2025</SelectItem>
            <SelectItem value="q2-2025">Q2 2025</SelectItem>
            <SelectItem value="april2025">April 2025</SelectItem>
            <SelectItem value="march2025">March 2025</SelectItem>
            <SelectItem value="q1-2025">Q1 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProfileHeader;
