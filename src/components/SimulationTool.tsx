
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/i18n/LanguageContext';

interface SimulationToolProps {
  currency: string;
  currentCommission: number;
  simulateEarnings: (salesCount: number, salesValue: number) => number;
}

const SimulationTool: React.FC<SimulationToolProps> = ({ 
  currency, 
  currentCommission,
  simulateEarnings
}) => {
  const { t } = useLanguage();
  const [salesCount, setSalesCount] = useState(1);
  const [salesAvgValue, setSalesAvgValue] = useState(5000);
  const [simulatedEarnings, setSimulatedEarnings] = useState<number | null>(null);
  
  const handleSimulate = () => {
    const additionalEarnings = simulateEarnings(salesCount, salesAvgValue);
    setSimulatedEarnings(additionalEarnings);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{t.headers.commissionSimulator}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salesCount">{t.content.numberOfSales}</Label>
              <Input
                id="salesCount"
                type="number"
                min="1"
                value={salesCount}
                onChange={(e) => setSalesCount(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salesValue">{t.content.avgSaleValue} ({currency})</Label>
              <Input
                id="salesValue"
                type="number"
                min="0"
                value={salesAvgValue}
                onChange={(e) => setSalesAvgValue(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
          
          <Button onClick={handleSimulate} className="w-full bg-commission-primary hover:bg-commission-secondary">
            {t.content.calculateEarnings}
          </Button>
          
          {simulatedEarnings !== null && (
            <div className="mt-4 p-4 bg-commission-light rounded-lg text-center">
              <p className="text-sm mb-2">{t.content.potentialEarnings} <strong>{salesCount} {t.content.moreSales}</strong> {t.content.at} {currency}{salesAvgValue.toLocaleString()} {t.content.each}:</p>
              <p className="text-xl font-bold text-commission-primary">
                {t.content.additionalEarnings} {currency}{simulatedEarnings.toLocaleString()}
              </p>
              <p className="text-sm mt-2">
                {t.content.totalPotential}: {currency}{(currentCommission + simulatedEarnings).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationTool;
