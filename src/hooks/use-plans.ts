"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Plan, CreatePlanInput } from "@/types";

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
