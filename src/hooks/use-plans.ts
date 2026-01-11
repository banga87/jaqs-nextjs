"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Plan, PlanWithPhases, CreatePlanInput, UpdatePlanInput } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Query keys
export const planKeys = {
  all: ["plans"] as const,
  detail: (id: string) => ["plans", id] as const,
};

// Fetch all plans
async function fetchPlans(): Promise<Plan[]> {
  const response = await fetch(`${API_URL}/phase-orchestrator/plans`);
  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }
  return response.json();
}

// Create a plan
async function createPlan(data: CreatePlanInput): Promise<Plan> {
  const response = await fetch(`${API_URL}/phase-orchestrator/plans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create plan");
  }
  return response.json();
}

// Delete a plan
async function deletePlan(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/phase-orchestrator/plans/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete plan");
  }
}

// Fetch a single plan with parsed phases
async function fetchPlan(id: string): Promise<PlanWithPhases> {
  const response = await fetch(`${API_URL}/phase-orchestrator/plans/${id}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch plan");
  }
  return response.json();
}

// Update a plan
async function updatePlan({
  id,
  data,
}: {
  id: string;
  data: UpdatePlanInput;
}): Promise<PlanWithPhases> {
  const response = await fetch(`${API_URL}/phase-orchestrator/plans/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update plan");
  }
  return response.json();
}

/**
 * Hook to fetch all plans
 */
export function usePlans() {
  return useQuery({
    queryKey: planKeys.all,
    queryFn: fetchPlans,
  });
}

/**
 * Hook to create a new plan
 */
export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planKeys.all });
      toast.success("Plan created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create plan");
    },
  });
}

/**
 * Hook to delete a plan
 */
export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planKeys.all });
      toast.success("Plan deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete plan");
    },
  });
}

/**
 * Hook to fetch a single plan with parsed phases
 */
export function usePlan(id: string) {
  return useQuery({
    queryKey: planKeys.detail(id),
    queryFn: () => fetchPlan(id),
    enabled: !!id,
  });
}

/**
 * Hook to update a plan
 */
export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlan,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: planKeys.all });
      queryClient.setQueryData(planKeys.detail(data.id), data);
      toast.success("Plan updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update plan");
    },
  });
}
