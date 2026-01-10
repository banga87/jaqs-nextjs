'use client';

import { CheckCircle, Circle, Loader2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PhaseExecution, PhaseStatus as PhaseStatusType } from '@/types';
import { cn } from '@/lib/utils';

interface PhaseStatusProps {
  phase: PhaseExecution;
  className?: string;
}

const statusConfig: Record<PhaseStatusType, {
  icon: typeof CheckCircle;
  variant: 'warning' | 'default' | 'success' | 'destructive';
  label: string;
  animate?: boolean;
}> = {
  pending: {
    icon: Circle,
    variant: 'warning',
    label: 'Pending',
  },
  running: {
    icon: Loader2,
    variant: 'default',
    label: 'Running',
    animate: true,
  },
  completed: {
    icon: CheckCircle,
    variant: 'success',
    label: 'Completed',
  },
  failed: {
    icon: XCircle,
    variant: 'destructive',
    label: 'Failed',
  },
};

export function PhaseStatus({ phase, className }: PhaseStatusProps) {
  const config = statusConfig[phase.status];
  const Icon = config.icon;

  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-lg border', className)}>
      <Icon
        className={cn(
          'h-5 w-5',
          config.animate && 'animate-spin',
          phase.status === 'completed' && 'text-green-600',
          phase.status === 'failed' && 'text-destructive',
          phase.status === 'running' && 'text-primary',
          phase.status === 'pending' && 'text-muted-foreground'
        )}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">
            Phase {phase.phaseNumber}: {phase.phaseName}
          </span>
        </div>
      </div>
      <Badge variant={config.variant}>{config.label}</Badge>
    </div>
  );
}
