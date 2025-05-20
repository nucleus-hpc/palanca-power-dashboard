
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MotivationMessageProps {
  message: string;
  type: 'success' | 'warning' | 'info';
}

const MotivationMessage: React.FC<MotivationMessageProps> = ({ message, type }) => {
  const bgColor = {
    success: 'bg-green-50 border-green-200',
    warning: 'bg-amber-50 border-amber-200',
    info: 'bg-blue-50 border-blue-200'
  }[type];
  
  const textColor = {
    success: 'text-green-700',
    warning: 'text-amber-700',
    info: 'text-blue-700'
  }[type];

  return (
    <Card className={`mb-6 border-dashed ${bgColor}`}>
      <CardContent className="py-4">
        <p className={`text-center font-medium ${textColor}`}>{message}</p>
      </CardContent>
    </Card>
  );
};

export default MotivationMessage;
