
import React from 'react';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import CrossedOutIcon from '@/components/ui/crossed-out-icon';

interface CommissionEarnedProps {
  amount: number;
  currency: string;
  label?: string;
  showCrossedIcon?: boolean;
}

const CommissionEarned: React.FC<CommissionEarnedProps> = ({ 
  amount, 
  currency,
  label,
  showCrossedIcon = false
}) => {
  const { t } = useLanguage();
  
  // Determine styling based on amount
  const isPositive = amount > 0;
  
  // Background and text colors based on amount
  const bgColor = isPositive ? 'bg-[#E6F4EA]' : 'bg-[#FDECEA]';
  const textColor = isPositive ? 'text-[#10B981]' : 'text-[#D93025]';
  
  // Format numbers with two decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-GT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  return (
    <div className={`p-4 rounded-xl flex items-center shadow-sm ${bgColor}`}>
      <div className="bg-white/80 p-3 rounded-full mr-4">
        {showCrossedIcon ? (
          <CrossedOutIcon 
            Icon={Shield} 
            size={20} 
            color={textColor.replace('text-', '#').replace('[', '').replace(']', '')} 
          />
        ) : (
          <Shield className={`h-5 w-5 ${textColor}`} />
        )}
      </div>
      <div>
        <div className={`text-sm ${textColor}/80`}>
          {label || t.content.commissionEarned}
        </div>
        <div className={`font-bold text-lg ${textColor}`}>
          {currency}{formatCurrency(amount)}
        </div>
      </div>
    </div>
  );
};

export default CommissionEarned;
