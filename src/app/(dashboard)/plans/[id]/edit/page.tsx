"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { usePlan, useUpdatePlan } from "@/hooks/use-plans";
import { createPlanSchema } from "@/types";
import type { PlanWithPhases } from "@/types";

interface EditPlanPageProps {
  params: Promise<{ id: string }>;
}

interface EditPlanFormProps {
  plan: PlanWithPhases;
  id: string;
}

function EditPlanForm({ plan, id }: EditPlanFormProps) {
  const router = useRouter();
  const updatePlan = useUpdatePlan();

  const [name, setName] = useState(plan.name);
  const [content, setContent] = useState(plan.content);
  const [workingDirectory, setWorkingDirectory] = useState(plan.workingDirectory || "");
  const [errors, setErrors] = useState<{ name?: string; content?: string; workingDirectory?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate using Zod schema
    const result = createPlanSchema.safeParse({ name, content, workingDirectory: workingDirectory || undefined });
    if (!result.success) {
      const fieldErrors: { name?: string; content?: string; workingDirectory?: string } = {};
      for (const issue of result.error.issues) {
        if (issue.path[0] === "name") {
          fieldErrors.name = issue.message;
        } else if (issue.path[0] === "content") {
          fieldErrors.content = issue.message;
        } else if (issue.path[0] === "workingDirectory") {
          fieldErrors.workingDirectory = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    updatePlan.mutate(
      { id, data: { name, content, workingDirectory: workingDirectory || undefined } },
      {
        onSuccess: () => {
          router.push(`/plans/${id}`);
        },
      }
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/plans/${id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Plan
        </Link>
        <h1 className="text-3xl font-bold">Edit Plan</h1>
      </div>

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Plan Details</CardTitle>
            <CardDescription>
              Update your multi-phase implementation plan. Use markdown with
              &quot;## Phase N: Name&quot; headers to define phases.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Plan Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                placeholder="Enter plan name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Working Directory */}
            <div className="space-y-2">
              <Label htmlFor="workingDirectory">Working Directory (Optional)</Label>
              <Input
                id="workingDirectory"
                placeholder="C:\Code\my-project or /home/user/my-project"
                value={workingDirectory}
                onChange={(e) => setWorkingDirectory(e.target.value)}
                aria-invalid={!!errors.workingDirectory}
              />
              <p className="text-sm text-muted-foreground">
                Absolute path where Claude Code sessions will run. Leave empty to use server&apos;s current directory.
              </p>
              {errors.workingDirectory && (
                <p className="text-sm text-destructive">{errors.workingDirectory}</p>
              )}
            </div>

            {/* Plan Content */}
            <div className="space-y-2">
              <Label htmlFor="content">Plan Content (Markdown)</Label>
              <Textarea
                id="content"
                placeholder={`## Phase 1: Foundation
- Task 1.1: Create database schema
- Task 1.2: Implement base service

## Phase 2: API Layer
- Task 2.1: Create endpoints
- Task 2.2: Add validation`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ minHeight: "400px" }}
                className="font-mono text-sm"
                aria-invalid={!!errors.content}
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/plans/${id}`)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updatePlan.isPending}>
              {updatePlan.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default function EditPlanPage({ params }: EditPlanPageProps) {
  const { id } = use(params);
  const { data: plan, isLoading, error } = usePlan(id);

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
      <div className="container mx-auto py-8 px-4 max-w-3xl">
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
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
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

  return <EditPlanForm plan={plan} id={id} />;
}
