
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Star, Trophy, TrendingUp, Flag } from 'lucide-react';

interface Driver {
  id: number;
  name: string;
  currentValue: number;
  goal: number;
  commission: number;
  nextThreshold: number;
  nextCommission: number;
  progress: number;
  icon: string;
  badgeEarned: boolean;
  tip: string;
}

interface AchievementSectionProps {
  drivers: Driver[];
  level: string;
  nextLevel: string;
  levelProgress: number;
}

const AchievementSection: React.FC<AchievementSectionProps> = ({
  drivers,
  level,
  nextLevel,
  levelProgress
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trending-up': return <TrendingUp className="h-5 w-5" />;
      case 'star': return <Star className="h-5 w-5" />;
      case 'flag': return <Flag className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Achievement Progress
        </h2>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Award className="h-8 w-8 text-commission-primary" />
              <div>
                <h3 className="font-bold text-lg">{level}</h3>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">Progress to {nextLevel}</span>
                <span className="text-sm font-medium">{levelProgress}%</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </div>
            
            <div className="flex items-center gap-2">
              <div>
                <h3 className="font-bold text-lg">{nextLevel}</h3>
                <div className="text-sm text-muted-foreground">Next Level</div>
              </div>
              <Award className="h-8 w-8 text-gray-300" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {drivers.map(driver => (
              <div key={driver.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${driver.badgeEarned ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-500'} mr-3`}>
                  {getIcon(driver.icon)}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{driver.name}</div>
                  <div className="text-xs text-muted-foreground">{driver.progress}% Complete</div>
                </div>
                <Badge className={driver.badgeEarned ? 'bg-yellow-500' : 'bg-gray-300'}>
                  {driver.badgeEarned ? 'Earned' : 'Locked'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementSection;
