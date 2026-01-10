import { z } from 'zod';

// Status union types
export type RunStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
export type PhaseStatus = 'pending' | 'running' | 'completed' | 'failed';

// Plan type
export interface Plan {
  id: string;
  name: string;
  content: string;
  phaseCount: number;
  createdAt: string;
  updatedAt: string;
}

// Plan with parsed phases (returned from GET /plans/:id)
export interface ParsedPhase {
  number: number;
  name: string;
  tasks: string[];
  rawContent: string;
}

export interface PlanWithPhases extends Plan {
  parsedPhases: ParsedPhase[];
}

// Run type
export interface Run {
  id: string;
  planId: string;
  status: RunStatus;
  currentPhase: number;
  errorMessage: string | null;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// PhaseExecution type
export interface PhaseExecution {
  id: string;
  runId: string;
  phaseNumber: number;
  phaseName: string;
  status: PhaseStatus;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Run with phase executions (returned from GET /runs/:id)
export interface RunWithPhases extends Run {
  phaseExecutions: PhaseExecution[];
  plan?: Plan;
}

// Zod schemas for form validation
export const createPlanSchema = z.object({
  name: z
    .string()
    .min(1, 'Plan name is required')
    .max(255, 'Plan name must be 255 characters or less'),
  content: z
    .string()
    .min(1, 'Plan content is required'),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;

export const createRunSchema = z.object({
  planId: z
    .string()
    .uuid('Invalid plan ID format'),
});

export type CreateRunInput = z.infer<typeof createRunSchema>;

// CLI Status response type
export interface CLIStatus {
  installed: boolean;
  path: string | null;
  version: string | null;
  authenticated: boolean;
  error: string | null;
}

// SSE Event types for run streaming
export type OrchestrationEventType =
  | 'run_started'
  | 'phase_started'
  | 'phase_progress'
  | 'tool_use'
  | 'phase_completed'
  | 'run_completed'
  | 'run_cancelled'
  | 'error';

export interface OrchestrationEvent {
  type: OrchestrationEventType;
  runId: string;
  phaseNumber?: number;
  phaseName?: string;
  message?: string;
  toolName?: string;
  toolInput?: string;
  error?: string;
  timestamp: string;
}
