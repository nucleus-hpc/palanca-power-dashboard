
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardHeaderProps {
  title: string;
  currentSalesRepId: string;
  onSalesRepChange: (id: string) => void;
  allSalesReps: Array<{
    id: string;
    name: string;
    routeNumber: string;
    performanceLevel: 'low' | 'medium' | 'high';
  }>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  currentSalesRepId,
  onSalesRepChange,
  allSalesReps
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-commission-dark dark:text-white">{title}</h1>
      <Select value={currentSalesRepId} onValueChange={onSalesRepChange}>
        <SelectTrigger className="w-[240px] bg-white dark:bg-sidebar-accent shadow-md">
          <SelectValue placeholder="Seleccionar vendedor" />
        </SelectTrigger>
        <SelectContent>
          {allSalesReps.map((rep) => (
            <SelectItem key={rep.id} value={rep.id}>
              {rep.name} - Ruta {rep.routeNumber}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashboardHeader;
