# Types Directory

## Naming Conventions

- Types use **camelCase** to match API responses: `phaseCount` not `phase_count`
- Status values are union types: `'pending' | 'running' | 'completed'`

## Type Structure

```typescript
// Base type
export interface Feature {
  id: string;
  name: string;
  status: FeatureStatus;
  createdAt: string;  // ISO date string
}

// Extended type with relations
export interface FeatureWithDetails extends Feature {
  items: Item[];
  plan?: Plan;
}
```

## Zod Validation

```typescript
export const createFeatureSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  content: z.string().min(1, 'Content is required'),
});

export type CreateFeatureInput = z.infer<typeof createFeatureSchema>;
```

## Status Types

```typescript
export type RunStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
export type PhaseStatus = 'pending' | 'running' | 'completed' | 'failed';
```

## Nullable Fields

Document when fields can be null:
```typescript
export interface Run {
  errorMessage: string | null;  // Only populated on failure
  startedAt: string | null;     // Only when running/completed
  completedAt: string | null;   // Only when completed/failed
}
```
