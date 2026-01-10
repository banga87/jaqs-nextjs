'use client';

import { Progress } from '@/components/ui/progress';
import { RunWithPhases } from '@/types';
import { cn } from '@/lib/utils';

interface RunProgressProps {
  run: RunWithPhases;
  className?: string;
}

export function RunProgress({ run, className }: RunProgressProps) {
  const totalPhases = run.phaseExecutions.length;
  const completedPhases = run.phaseExecutions.filter(
    (p) => p.status === 'completed'
  ).length;
  const progressPercent = totalPhases > 0
    ? Math.round((completedPhases / totalPhases) * 100)
    : 0;

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Phase {run.currentPhase} of {totalPhases}
        </span>
        <span className="font-medium">{progressPercent}% Complete</span>
      </div>
      <Progress value={progressPercent} className="h-3" />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{completedPhases} of {totalPhases} phases complete</span>
      </div>
    </div>
  );
}
