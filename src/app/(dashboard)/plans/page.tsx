"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Plus, Play, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

import { usePlans, useDeletePlan } from "@/hooks/use-plans";
import type { Plan } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function PlansPage() {
  const router = useRouter();
  const { data: plans, isLoading, error } = usePlans();
  const deletePlan = useDeletePlan();
  const [startingRunForPlanId, setStartingRunForPlanId] = useState<string | null>(null);

  const handleStartRun = async (planId: string) => {
    setStartingRunForPlanId(planId);
    try {
      const response = await fetch(`${API_URL}/phase-orchestrator/runs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to start run");
      }

      const run = await response.json();
      toast.success("Run started successfully");
      router.push(`/runs/${run.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to start run");
    } finally {
      setStartingRunForPlanId(null);
    }
  };

  const handleDelete = (planId: string) => {
    deletePlan.mutate(planId);
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-destructive">
          Failed to load plans. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Phase Orchestrator</h1>
        <Button asChild>
          <Link href="/plans/new">
            <Plus className="h-4 w-4" />
            New Plan
          </Link>
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter className="gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && plans && plans.length === 0 && (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileText />
            </EmptyMedia>
            <EmptyTitle>No plans yet</EmptyTitle>
            <EmptyDescription>
              Create your first plan to start orchestrating multi-phase implementations.
            </EmptyDescription>
          </EmptyHeader>
          <Button asChild>
            <Link href="/plans/new">
              <Plus className="h-4 w-4" />
              Create Your First Plan
            </Link>
          </Button>
        </Empty>
      )}

      {/* Plans Grid */}
      {!isLoading && plans && plans.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan: Plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle>
                  <Link
                    href={`/plans/${plan.id}`}
                    className="hover:underline"
                  >
                    {plan.name}
                  </Link>
                </CardTitle>
                <CardDescription>
                  Created {format(new Date(plan.createdAt), "MMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {plan.phaseCount} {plan.phaseCount === 1 ? "phase" : "phases"}
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  size="sm"
                  onClick={() => handleStartRun(plan.id)}
                  disabled={startingRunForPlanId === plan.id}
                >
                  <Play className="h-4 w-4" />
                  {startingRunForPlanId === plan.id ? "Starting..." : "Start Run"}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={deletePlan.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Plan</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &quot;{plan.name}&quot;? This action
                        cannot be undone and will also delete all associated runs.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(plan.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
