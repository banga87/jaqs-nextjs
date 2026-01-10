# CLAUDE.md - jaqs-nextjs Frontend

## Commands
```bash
npm run dev        # Dev server on port 3000
npm run build      # Production build (MUST pass before commit)
npm run lint       # ESLint check (MUST pass before commit)
```

## Architecture

```
src/
├── app/                   # Next.js App Router pages
│   ├── (dashboard)/       # Protected routes
│   └── auth/              # Auth pages
├── components/
│   ├── ui/                # shadcn/ui base components
│   └── run/               # Feature components
├── hooks/                 # TanStack Query hooks
├── lib/supabase/          # Supabase client & middleware
├── contexts/              # React contexts (Auth)
└── types/                 # TypeScript types & Zod schemas
```

## API Calls (CRITICAL)

**ALWAYS use hooks from `src/hooks/`, NEVER use direct fetch.**

```typescript
// WRONG - direct fetch in component
const handleStartRun = async (planId: string) => {
  const response = await fetch(`${API_URL}/runs`, {...});  // BAD
};

// CORRECT - use the hook
const startRun = useStartRun();
const handleStartRun = (planId: string) => {
  startRun.mutate({ planId });
};
```

## Hook Patterns

**Query keys:** Use factory pattern for consistency.
```typescript
export const planKeys = {
  all: ['plans'] as const,
  detail: (id: string) => ['plans', id] as const,
};
```

**Mutations:** Always invalidate cache and show toasts.
```typescript
return useMutation({
  mutationFn: createPlan,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: planKeys.all });
    toast.success('Plan created');
  },
  onError: (error: Error) => {
    toast.error(error.message || 'Failed to create plan');
  },
});
```

## Error Handling

**All async operations need try-catch with user feedback:**
```typescript
try {
  await supabase.auth.exchangeCodeForSession(code);
} catch (error) {
  console.error('Auth callback error:', error);
  // Redirect to login with error state
}
```

**JSON parsing must handle failures:**
```typescript
// WRONG
const error = await response.json().catch(() => ({}));  // Silent fail

// CORRECT
let errorMessage = 'Request failed';
try {
  const error = await response.json();
  errorMessage = error.message || errorMessage;
} catch { /* JSON parse failed, use default */ }
throw new Error(errorMessage);
```

## Component Patterns

**Loading states:** Always show skeleton while loading.
**Error states:** Always show error message with retry option.
**Empty states:** Use the Empty component from shadcn/ui.

```typescript
if (isLoading) return <Skeleton />;
if (error) return <ErrorMessage retry={refetch} />;
if (!data?.length) return <Empty />;
return <DataList data={data} />;
```

## Type Safety

- All API responses must have TypeScript types in `src/types/`
- Form validation uses Zod schemas
- Status values use union types: `'pending' | 'running' | 'completed'`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Commit Checklist

Before committing:
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] UI changes verified in browser
- [ ] New API calls use hooks (not direct fetch)
