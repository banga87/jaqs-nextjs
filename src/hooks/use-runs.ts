"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { RunWithPhases, CreateRunInput } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Query keys
export const runKeys = {
  all: ["runs"] as const,
  detail: (id: string) => ["runs", id] as const,
};

// Fetch a single run with phase executions
async function fetchRun(id: string): Promise<RunWithPhases> {
  const response = await fetch(`${API_URL}/phase-orchestrator/runs/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch run");
  }
  return response.json();
}

// Start a new run for a plan
async function startRun(data: CreateRunInput): Promise<RunWithPhases> {
  const response = await fetch(`${API_URL}/phase-orchestrator/runs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to start run");
  }
  return response.json();
}

// Cancel an active run
async function cancelRun(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/phase-orchestrator/runs/${id}/cancel`, {
    method: "POST",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to cancel run");
  }
}

/**
 * Hook to fetch a single run with phase executions
 * Auto-refetches every 2 seconds while run status is 'running'
 */
export function useRun(runId: string) {
  return useQuery({
    queryKey: runKeys.detail(runId),
    queryFn: () => fetchRun(runId),
    enabled: !!runId,
    refetchInterval: (query) => {
      const data = query.state.data;
      // Auto-refetch every 2 seconds while run is running
      if (data?.status === "running") {
        return 2000;
      }
      return false;
    },
  });
}

/**
 * Hook to start a new run for a plan
 */
export function useStartRun() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startRun,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: runKeys.all });
      queryClient.setQueryData(runKeys.detail(data.id), data);
      toast.success("Run started successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to start run");
    },
  });
}

/**
 * Hook to cancel an active run
 */
export function useCancelRun() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelRun,
    onSuccess: (_data, runId) => {
      queryClient.invalidateQueries({ queryKey: runKeys.detail(runId) });
      toast.success("Run cancelled");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to cancel run");
    },
  });
}
