
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
      className="h-4 w-4 p-0 bg-[#24AFF2] hover:bg-[#24AFF2]/90 text-white border-0"
      onClick={onClick}
    >
      <ArrowUpRight className="h-2.5 w-2.5" />
    </Button>
  );
};

export default DetailsButton;
