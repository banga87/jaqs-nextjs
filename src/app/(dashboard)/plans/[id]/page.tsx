"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Play, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { usePlan } from "@/hooks/use-plans";
import { useStartRun } from "@/hooks/use-runs";

interface PlanPageProps {
  params: Promise<{ id: string }>;
}

export default function PlanPage({ params }: PlanPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { data: plan, isLoading, error } = usePlan(id);
  const startRun = useStartRun();
  const [isStartingRun, setIsStartingRun] = useState(false);

  const handleStartRun = async () => {
    setIsStartingRun(true);
    startRun.mutate(
      { planId: id },
      {
        onSuccess: (run) => {
          router.push(`/runs/${run.id}`);
        },
        onSettled: () => {
          setIsStartingRun(false);
        },
      }
    );
  };

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
          Failed to load plan. Please try again.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
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
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!plan) {
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
        <div className="text-center text-muted-foreground">Plan not found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/plans"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Plans
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="mt-1">
                Created {format(new Date(plan.createdAt), "MMM d, yyyy")}
                {plan.updatedAt !== plan.createdAt && (
                  <> · Updated {format(new Date(plan.updatedAt), "MMM d, yyyy")}</>
                )}
                {" · "}
                {plan.phaseCount} {plan.phaseCount === 1 ? "phase" : "phases"}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/plans/${id}/edit`}>
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button
                size="sm"
                onClick={handleStartRun}
                disabled={isStartingRun}
              >
                {isStartingRun ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isStartingRun ? "Starting..." : "Start Run"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Phases */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Phases</h3>
            {plan.phases && plan.phases.length > 0 ? (
              <div className="space-y-4">
                {plan.phases.map((phase) => (
                  <div
                    key={phase.number}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {phase.number}
                      </span>
                      <h4 className="font-medium">{phase.name}</h4>
                    </div>
                    {phase.tasks && phase.tasks.length > 0 && (
                      <ul className="ml-8 space-y-1">
                        {phase.tasks.map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className="text-sm text-muted-foreground"
                          >
                            • {task}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No phases found. The plan content may not follow the expected format.
              </p>
            )}
          </div>

          {/* Raw Content */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Raw Content</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap">
              {plan.content}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
