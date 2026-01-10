"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { runKeys } from "./use-runs";
import type { RunWithPhases, Run, PhaseExecution } from "@/types";

/**
 * Hook to subscribe to Supabase Realtime updates for a run
 * Updates TanStack Query cache when changes are received
 */
export function useRunSubscription(runId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!runId) return;

    // Subscribe to run changes
    const runChannel = supabase
      .channel(`run-${runId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orchestrator_runs",
          filter: `id=eq.${runId}`,
        },
        (payload) => {
          // Update the run data in cache
          queryClient.setQueryData<RunWithPhases>(
            runKeys.detail(runId),
            (oldData) => {
              if (!oldData) return oldData;

              // Merge the updated run fields with existing data
              const newRun = payload.new as Partial<Run>;
              return {
                ...oldData,
                ...newRun,
              };
            }
          );
        }
      )
      .subscribe();

    // Subscribe to phase execution changes
    const phasesChannel = supabase
      .channel(`phases-${runId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orchestrator_phase_executions",
          filter: `runId=eq.${runId}`,
        },
        (payload) => {
          // Update the phase executions in cache
          queryClient.setQueryData<RunWithPhases>(
            runKeys.detail(runId),
            (oldData) => {
              if (!oldData) return oldData;

              const updatedPhase = payload.new as PhaseExecution;
              const eventType = payload.eventType;

              let updatedPhases = [...oldData.phaseExecutions];

              if (eventType === "INSERT") {
                // Add new phase execution
                const exists = updatedPhases.some(
                  (p) => p.id === updatedPhase.id
                );
                if (!exists) {
                  updatedPhases.push(updatedPhase);
                  // Sort by phase number
                  updatedPhases.sort((a, b) => a.phaseNumber - b.phaseNumber);
                }
              } else if (eventType === "UPDATE") {
                // Update existing phase execution
                updatedPhases = updatedPhases.map((p) =>
                  p.id === updatedPhase.id ? { ...p, ...updatedPhase } : p
                );
              } else if (eventType === "DELETE") {
                // Remove deleted phase execution
                const deletedPhase = payload.old as { id: string };
                updatedPhases = updatedPhases.filter(
                  (p) => p.id !== deletedPhase.id
                );
              }

              return {
                ...oldData,
                phaseExecutions: updatedPhases,
              };
            }
          );
        }
      )
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(runChannel);
      supabase.removeChannel(phasesChannel);
    };
  }, [runId, queryClient]);
}
