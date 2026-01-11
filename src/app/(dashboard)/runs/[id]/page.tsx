"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
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

import { useRun, useCancelRun } from "@/hooks/use-runs";
import { RunProgress, PhaseList } from "@/components/run";
import type { RunStatus } from "@/types";

interface RunPageProps {
  params: Promise<{ id: string }>;
}

function getStatusBadgeVariant(status: RunStatus): "default" | "secondary" | "destructive" | "success" | "warning" {
  switch (status) {
    case "pending":
      return "warning";
    case "running":
      return "default";
    case "completed":
      return "success";
    case "failed":
      return "destructive";
    case "cancelled":
      return "secondary";
    default:
      return "default";
  }
}

function getStatusLabel(status: RunStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function RunPage({ params }: RunPageProps) {
  const { id } = use(params);
  const { data: run, isLoading, error } = useRun(id);
  const cancelRun = useCancelRun();

  const handleCancel = () => {
    cancelRun.mutate(id);
  };

  const canCancel = run && (run.status === "pending" || run.status === "running");

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Link
            href="/plans"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Link>
        </div>
        <div className="text-center text-destructive">
          Failed to load run. Please try again.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Link
            href="/plans"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!run) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Link
            href="/plans"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Link>
        </div>
        <div className="text-center text-muted-foreground">
          Run not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/plans"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Plans
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl">
                {run.plan?.name || "Run Details"}
              </CardTitle>
              <Badge variant={getStatusBadgeVariant(run.status)}>
                {getStatusLabel(run.status)}
              </Badge>
            </div>
            {canCancel && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={cancelRun.isPending}
                  >
                    <XCircle className="h-4 w-4" />
                    {cancelRun.isPending ? "Cancelling..." : "Cancel Run"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Run</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel this run? The current phase
                      will be terminated and no further phases will be executed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Running</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancel}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Cancel Run
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <RunProgress run={run} />

          {/* Error Message */}
          {run.errorMessage && (
            <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4">
              <p className="text-sm text-destructive font-medium">Error</p>
              <p className="text-sm text-destructive/80 mt-1">
                {run.errorMessage}
              </p>
            </div>
          )}

          {/* Phases List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Phases</h3>
            <PhaseList phases={run.phaseExecutions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
