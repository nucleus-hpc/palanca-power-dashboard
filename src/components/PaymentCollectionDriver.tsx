import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BadgeCheck, Calendar, CreditCard } from 'lucide-react';

interface PaymentCollectionDriverProps {
  totalPayments: number;
  paymentsCollected: number;
  commissionEarned: number;
  currency: string;
}

const PaymentCollectionDriver: React.FC<PaymentCollectionDriverProps> = ({
  totalPayments,
  paymentsCollected,
  commissionEarned,
  currency
}) => {
  // Calculate progress percentage
  const progressPercentage = Math.round((paymentsCollected / totalPayments) * 100) || 0;
  
  // Determine if there's commission earned
  const hasCommissionEarned = commissionEarned > 0;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-commission-primary" />
            Payment Collection Driver
          </h2>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>This week</span>
          </div>
        </div>
        
        {/* Progress section */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>
              <BadgeCheck className="h-4 w-4 inline mr-1 text-status-success" />
              <span className="font-medium">{paymentsCollected} of {totalPayments} payments collected</span>
            </span>
            <span className="text-muted-foreground">{progressPercentage}% complete</span>
          </div>
          
          <Progress 
            value={progressPercentage} 
            className="h-3"
            style={{
              background: 'linear-gradient(to right, #e5e7eb, #e5e7eb)',
            }}
          />
          
          {/* Custom progress indicator with checkmarks */}
          <div className="relative mt-1">
            <div className="flex justify-between">
              {Array.from({ length: totalPayments }).map((_, index) => {
                const isCollected = index < paymentsCollected;
                return (
                  <div 
                    key={index} 
                    className={`h-3 w-3 rounded-full flex items-center justify-center
                      ${isCollected ? 'bg-status-success text-white' : 'bg-status-neutral'}`}
                  >
                    {isCollected && (
                      <BadgeCheck className="h-2 w-2 text-white" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Commission earned section */}
        <div className="p-4 rounded-lg flex items-center bg-gray-50 dark:highlighted-card border border-commission-primary/30 dark:border-commission-primary/20">
          <div 
            className={`p-2 rounded-full mr-3
              ${hasCommissionEarned 
                ? 'bg-commission-primary/20' 
                : 'bg-status-neutral/50 dark:bg-gray-700'}`}
          >
            <CreditCard 
              className={`h-5 w-5
                ${hasCommissionEarned 
                  ? 'text-commission-primary' 
                  : 'text-status-neutral'}`} 
            />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Commission Earned (Cobros)</div>
            <div 
              className={`font-bold text-lg
                ${hasCommissionEarned 
                  ? 'text-commission-primary' 
                  : 'text-status-neutral'}`}
            >
              {currency}{commissionEarned.toLocaleString()}
              {hasCommissionEarned && (
                <span className="ml-2 text-xs bg-commission-primary/10 text-commission-primary px-2 py-0.5 rounded-full dark:bg-commission-primary/20">
                  0.5% per collection
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCollectionDriver;
