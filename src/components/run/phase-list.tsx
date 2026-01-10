'use client';

import { PhaseExecution } from '@/types';
import { PhaseStatus } from './phase-status';
import { cn } from '@/lib/utils';

interface PhaseListProps {
  phases: PhaseExecution[];
  className?: string;
}

export function PhaseList({ phases, className }: PhaseListProps) {
  if (phases.length === 0) {
    return (
      <div className={cn('text-center py-8 text-muted-foreground', className)}>
        No phases found
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {phases.map((phase) => (
        <PhaseStatus key={phase.id} phase={phase} />
      ))}
    </div>
  );
}
