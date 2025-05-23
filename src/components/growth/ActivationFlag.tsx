
import React from 'react';

interface ActivationFlagProps {
  targetGrowthPercentage: number;
  currency: string;
  formatCurrency: (value: number) => string;
}

const ActivationFlag: React.FC<ActivationFlagProps> = ({ 
  targetGrowthPercentage,
  currency,
  formatCurrency
}) => (
  <div className="absolute top-[-4.5rem] -translate-x-1/2 flex flex-col items-center z-40 pointer-events-none">
    <div className="bg-commission-dark text-white px-2 py-1 rounded-t-md text-xs whitespace-nowrap">
      Punto de Activación
    </div>
    <div className="bg-commission-dark text-white p-2 rounded-b-md shadow-md text-center">
      <div className="font-bold text-sm">{targetGrowthPercentage}%</div>
      <div className="text-xs">+{currency}{formatCurrency(1000)}</div>
    </div>
    <div className="h-10 w-0.5 bg-commission-dark"></div>
  </div>
);

export default ActivationFlag;
