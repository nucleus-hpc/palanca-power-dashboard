
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

interface DetailsButtonProps {
  onClick?: () => void;
}

const DetailsButton: React.FC<DetailsButtonProps> = ({ onClick }) => {
  return (
    <Button
      size="sm"
      className="h-4 w-4 p-0 bg-transparent hover:bg-[#24AFF2]/10 text-[#24AFF2] border border-[#24AFF2] rounded"
      onClick={onClick}
    >
      <ArrowUpRight className="h-2.5 w-2.5" />
    </Button>
  );
};

export default DetailsButton;
