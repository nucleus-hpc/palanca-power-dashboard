
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, AlertTriangle, Calendar, Shield } from 'lucide-react';
import CommissionEarned from '@/components/commission/CommissionEarned';
import DetailsButton from '@/components/ui/details-button';

interface ChargesAndPenaltiesProps {
  totalPayments: number;
  paymentsCollected: number;
  overduePayments: number;
  upcomingPayments: number;
  totalCollected: number;
  totalOverdue: number;
  currency: string;
}

const ChargesAndPenalties: React.FC<ChargesAndPenaltiesProps> = ({
  totalPayments,
  paymentsCollected,
  overduePayments,
  upcomingPayments,
  totalCollected,
  totalOverdue,
  currency
}) => {
  // Format numbers with two decimal places
  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-GT', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };
  
  // Calculate penalty amount as 1.5% of totalOverdue
  const penaltyAmount = totalOverdue * 0.015;
  
  const renderSegments = (filled: number, total: number, colorClass: string) => {
    return (
      <div className="flex gap-1 mt-2">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index < filled ? 'bg-status-success' : colorClass
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="mb-4 overflow-visible rounded-xl shadow-lg">
      <div className="h-1 bg-commission-primary"></div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="font-bold text-lg flex items-center">
              <CreditCard className="h-5 w-5 mr-3 text-commission-primary" />
              Cobros y Penalizaciones
            </h2>
            <div className="text-xs px-2 py-1 bg-gray-100 rounded-md font-medium text-muted-foreground dark:bg-gray-700 flex items-center ml-3">
              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
              Esta semana
            </div>
          </div>
        </div>

        {/* Facturas por cobrar section */}
        <div className="p-4 rounded-lg mb-4">
          <h3 className="font-medium text-base mb-4">Facturas por cobrar</h3>
          
          {/* Overdue invoices */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Vencidas</span>
              <span className="text-sm">
                {overduePayments} / <span className="text-status-danger font-bold">{totalPayments}</span>
              </span>
            </div>
            {renderSegments(overduePayments, totalPayments, 'bg-[#E3CFCF]')}
          </div>
          
          {/* Upcoming invoices */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Por vencer</span>
              <span className="text-sm">
                {upcomingPayments} / <span className="text-status-warning font-bold">{21}</span>
              </span>
            </div>
            {renderSegments(upcomingPayments, 21, 'bg-[#E7E3C5]')}
          </div>
        </div>
        
        {/* Side-by-side columns for Cobros and Penalizaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Cobros section */}
          <Card className="shadow-sm bg-[#F8F9FA]">
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-commission-primary" />
                Cobros
              </h3>
              
              {/* Total collected with conditional styling */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">Total cobrado</div>
                    <DetailsButton />
                  </div>
                </div>
                <div className={`font-bold text-xl ${totalCollected > 0 ? 'text-status-success' : 'text-status-danger'}`}>
                  {currency}{formatCurrency(totalCollected)}
                </div>
              </div>
              
              {/* Commission details section */}
              <div className="bg-gray-50 p-3 rounded-xl flex items-center dark:highlighted-card shadow-sm border border-[#D1CFD7]">
                <div className="bg-gray-100 p-3 rounded-full mr-4 dark:bg-gray-700">
                  <CreditCard className="h-5 w-5 text-commission-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Descripción de comisión</div>
                  <div className="font-bold">0.5% sobre el monto total de los cobros realizados*</div>
                </div>
              </div>
              
              {/* Commission earned */}
              <div className="mt-4">
                <CommissionEarned 
                  amount={totalCollected * 0.005} 
                  currency={currency} 
                  label="Comisión Ganada"
                />
              </div>
              
              {/* Caption */}
              <div className="text-xs text-muted-foreground mt-4 italic">
                *Únicamente aplican cobros procesados por créditos durante esta semana
              </div>
            </CardContent>
          </Card>
          
          {/* Penalizaciones section */}
          <Card className="shadow-sm bg-[#F8F9FA]">
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-status-danger" />
                Penalizaciones
              </h3>
              
              {/* Total overdue with conditional styling */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">Total vencido</div>
                    <DetailsButton />
                  </div>
                </div>
                <div className={`font-bold text-xl ${totalOverdue > 0 ? 'text-status-danger' : 'text-status-success'}`}>
                  {currency}{formatCurrency(totalOverdue)}
                </div>
              </div>
              
              {/* Penalty details section */}
              <div className="bg-gray-50 p-3 rounded-xl flex items-center dark:highlighted-card shadow-sm border border-[#D1CFD7]">
                <div className="bg-gray-100 p-3 rounded-full mr-4 dark:bg-gray-700">
                  <AlertTriangle className="h-5 w-5 text-status-danger" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Descripción de penalización</div>
                  <div className="font-bold">1.5% sobre el monto total de facturas vencidas</div>
                </div>
              </div>
              
              {/* Total penalties - showing negative amount when overdue > 0 */}
              <div className="mt-4">
                <CommissionEarned 
                  amount={totalOverdue > 0 ? -penaltyAmount : 0} 
                  currency={currency} 
                  label="Total penalizaciones"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChargesAndPenalties;
