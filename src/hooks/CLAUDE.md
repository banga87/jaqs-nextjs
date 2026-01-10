# Hooks Directory

TanStack Query hooks for API data fetching and mutations.

## Query Key Pattern

```typescript
export const featureKeys = {
  all: ['features'] as const,
  detail: (id: string) => ['features', id] as const,
};
```

## Query Hook Pattern

```typescript
export function useFeature(id: string) {
  return useQuery({
    queryKey: featureKeys.detail(id),
    queryFn: () => fetchFeature(id),
    enabled: !!id,
    // Conditional refetch for "running" states
    refetchInterval: (query) => {
      return query.state.data?.status === 'running' ? 2000 : false;
    },
  });
}
```

## Mutation Hook Pattern

```typescript
export function useCreateFeature() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: featureKeys.all });
      toast.success('Created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create');
    },
  });
}
```

## Error Handling

```typescript
// Handle JSON parse errors properly
if (!response.ok) {
  let errorMessage = 'Request failed';
  try {
    const error = await response.json();
    errorMessage = error.message || errorMessage;
  } catch { /* JSON parse failed */ }
  throw new Error(errorMessage);
}
```

## Rules

- Export query keys for cache invalidation
- Always invalidate cache on mutations
- Always show toast on success/error
- Use `enabled` option to prevent unnecessary fetches
