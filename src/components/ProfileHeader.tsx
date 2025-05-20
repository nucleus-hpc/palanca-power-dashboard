
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfileHeaderProps {
  name: string;
  avatarUrl: string;
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
  level: string;
  levelProgress: number;
  nextLevel: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  avatarUrl,
  selectedPeriod,
  onPeriodChange,
  level,
  levelProgress,
  nextLevel
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="relative">
        <Avatar className="h-20 w-20 border-4 border-commission-primary">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-commission-primary text-white text-xl">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-xs font-bold text-commission-dark rounded-full h-7 w-7 flex items-center justify-center border-2 border-white">
          {level.split(' ')[0][0]}
        </div>
      </div>
      
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-commission-dark">{name}</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-commission-primary font-medium">{level}</span>
          <div className="text-xs text-muted-foreground">→</div>
          <span className="text-xs text-muted-foreground">{nextLevel}</span>
        </div>
        <div className="w-full max-w-[180px] mt-1">
          <Progress value={levelProgress} className="h-1.5" />
        </div>
      </div>
      
      <div className="w-full md:w-auto mt-2 md:mt-0">
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
