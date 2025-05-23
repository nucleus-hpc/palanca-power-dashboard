
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
      className="h-6 w-6 p-0 bg-[#24AFF2] hover:bg-[#24AFF2]/90 text-white border-0"
      onClick={onClick}
    >
      <ArrowUpRight className="h-3 w-3" />
    </Button>
  );
};

export default DetailsButton;
