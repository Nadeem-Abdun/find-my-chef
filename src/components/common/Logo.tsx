import { ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn('flex items-center gap-2 font-serif text-lg font-semibold', className)}>
      <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground shadow-sm">
        <ChefHat className="h-5 w-5" />
      </span>
      {!compact && (
        <span className="leading-tight">
          Find My <span className="text-primary">Chef</span>
        </span>
      )}
    </Link>
  );
}
