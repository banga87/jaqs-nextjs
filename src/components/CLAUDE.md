# Components Directory

## Structure

```
components/
├── ui/          # shadcn/ui base components (don't modify unless extending)
└── run/         # Feature-specific components
```

## Component Pattern

```typescript
interface FeatureProps {
  data: FeatureType;
  className?: string;
}

export function Feature({ data, className }: FeatureProps) {
  return (
    <div className={cn('base-styles', className)}>
      {/* content */}
    </div>
  );
}
```

## Status Configuration Pattern

```typescript
const statusConfig: Record<StatusType, {
  icon: LucideIcon;
  variant: BadgeVariant;
  label: string;
}> = {
  pending: { icon: Circle, variant: 'warning', label: 'Pending' },
  running: { icon: Loader2, variant: 'default', label: 'Running' },
  completed: { icon: CheckCircle, variant: 'success', label: 'Completed' },
  failed: { icon: XCircle, variant: 'destructive', label: 'Failed' },
};
```

## Loading/Error/Empty States

Every data-fetching component needs all three:
```typescript
if (isLoading) return <Skeleton />;
if (error) return <ErrorDisplay error={error} />;
if (!data?.length) return <Empty title="No items" />;
return <DataList data={data} />;
```

## Badge Variants

Available: `default`, `secondary`, `destructive`, `outline`, `success`, `warning`
