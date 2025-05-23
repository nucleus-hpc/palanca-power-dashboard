
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Clock, Shield } from 'lucide-react';

interface PaymentCollectionDriverProps {
  totalPayments: number;
  paymentsCollected: number;
  overduePayments: number;
  upcomingPayments: number;
  totalCollected: number;
  commissionEarned: number;
  currency: string;
}

const PaymentCollectionDriver: React.FC<PaymentCollectionDriverProps> = ({
  totalPayments,
  paymentsCollected,
  overduePayments,
  upcomingPayments,
  totalCollected,
  commissionEarned,
  currency
}) => {
  // Format numbers with two decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-GT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };
  
  const renderSegments = (filled: number, total: number, colorClass: string) => {
    return (
      <div className="flex gap-1 mt-2">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${index < filled ? 'bg-status-success' : 'bg-gray-300 dark:bg-gray-700'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="mb-6 overflow-visible rounded-xl shadow-lg">
      <div className="h-1 bg-commission-primary"></div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-lg flex items-center">
            <CreditCard className="h-5 w-5 mr-3 text-commission-primary" />
            Cobros
          </h2>
        </div>

        {/* Total collected - similar to "Total Sales" in GrowthByVolume */}
        <div className="mb-6">
          <div className="text-sm text-muted-foreground">Total cobrado</div>
          <div className="font-bold text-2xl text-foreground">
            {currency}{formatCurrency(totalCollected)}
          </div>
        </div>
        
        {/* Invoice collection section */}
        <div className="mb-6">
          <h3 className="font-medium text-base mb-4">Facturas por cobrar</h3>
          
          {/* Overdue invoices */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Vencidas</span>
              <span className="text-sm">
                {overduePayments} / <span className="text-status-danger">{totalPayments}</span>
              </span>
            </div>
            {renderSegments(overduePayments, totalPayments, 'bg-status-danger')}
          </div>
          
          {/* Upcoming invoices */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Facturas por vencer</span>
              <span className="text-sm">
                {upcomingPayments} / <span className="text-status-warning">{21}</span>
              </span>
            </div>
            {renderSegments(upcomingPayments, 21, 'bg-status-warning')}
          </div>
        </div>
        
        {/* Commission details section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 p-4 rounded-xl flex items-center dark:highlighted-card shadow-sm">
            <div className="bg-gray-100 p-3 rounded-full mr-4 dark:bg-gray-700">
              <CreditCard className="h-5 w-5 text-commission-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Descripción de comisión</div>
              <div className="font-bold">0.5% sobre el monto total de los cobros realizados</div>
              <div className="text-xs text-muted-foreground mt-1 italic">
                *Únicamente aplican cobros procesados por créditos durante esta semana
              </div>
            </div>
          </div>
          
          {/* Commission earned - similar to the one in GrowthByVolume */}
          <div className="bg-status-success p-4 rounded-xl flex items-center shadow-sm">
            <div className="bg-white/30 p-3 rounded-full mr-4">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-white/90">
                Comisión Ganada
              </div>
              <div className="font-bold text-lg text-white">
                {currency}{formatCurrency(commissionEarned)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCollectionDriver;
