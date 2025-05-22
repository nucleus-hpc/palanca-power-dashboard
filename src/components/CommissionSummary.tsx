
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, CircleX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/i18n/LanguageContext';

interface CommissionSummaryProps {
  totalCommission: number;
  goal: number;
  currency: string;
  remainingToGoal: number;
}

const CommissionSummary: React.FC<CommissionSummaryProps> = ({
  totalCommission,
  goal,
  currency,
  remainingToGoal
}) => {
  const { t } = useLanguage();
  const progress = Math.min(Math.round((totalCommission / goal) * 100), 100);
  const isGoalReached = progress >= 100;
  
  // Trigger confetti if goal is reached
  React.useEffect(() => {
    if (isGoalReached) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isGoalReached]);

  // Format numbers with two decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-GT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  return (
    <Card className="mt-6 overflow-hidden border-0 shadow-lg rounded-xl">
      <div className={`h-2 ${isGoalReached ? 'bg-gradient-to-r from-status-success to-green-600' : 'bg-gradient-to-r from-commission-primary to-commission-secondary'}`}></div>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-commission-light rounded-xl dark:highlighted-card shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">{t.content.totalCommission}</span>
            <span className="text-3xl font-bold text-commission-dark dark:text-white mt-2">{currency}{formatCurrency(totalCommission)}</span>
            <Badge className="mt-3 py-1 px-3 bg-commission-primary">{progress}% {t.common.ofTarget}</Badge>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="relative w-full">
              <Progress value={progress} className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                {isGoalReached ? t.content.goalCompleted : `${progress}% ${t.common.toGoal}`}
              </div>
            </div>
            
            <div className="mt-3 text-center">
              {isGoalReached ? (
                <div className="flex items-center justify-center text-status-success gap-1">
                  <CircleCheck className="h-4 w-4" /> 
                  <span>{t.content.goalReached}!</span>
                </div>
              ) : (
                <div className="text-commission-dark dark:text-white">
                  <span className="font-medium">{currency}{formatCurrency(remainingToGoal)}</span> {t.content.toGoal}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-commission-light rounded-xl dark:highlighted-card shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">{t.content.periodGoal}</span>
            <span className="text-3xl font-bold text-commission-dark dark:text-white mt-2">{currency}{formatCurrency(goal)}</span>
            <Badge variant="outline" className="mt-3 py-1 px-3 border-commission-primary text-commission-primary dark:border-commission-primary/50">
              {isGoalReached ? (
                <span className="flex items-center gap-1">
                  <CircleCheck className="h-4 w-4" /> {t.content.achieved}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <CircleX className="h-4 w-4" /> {t.content.notYet}
                </span>
              )}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionSummary;
