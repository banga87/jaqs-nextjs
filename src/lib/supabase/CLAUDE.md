# Supabase Integration

## Client Types

| Function | Use Case |
|----------|----------|
| `createBrowserClient` | Client-side (hooks, components) |
| `createServerClient` | Middleware, server components |

## Auth Callback (CRITICAL)

**Always wrap in try-catch:**
```typescript
if (code) {
  try {
    await supabase.auth.exchangeCodeForSession(code);
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/auth/login?error=callback', request.url));
  }
}
```

## Realtime Subscriptions

```typescript
// Subscribe to table changes
const channel = supabase
  .channel(`feature-${id}`)
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'table_name',
    filter: `id=eq.${id}`,
  }, (payload) => {
    // Update cache
  })
  .subscribe();

// ALWAYS cleanup
return () => supabase.removeChannel(channel);
```

## Middleware Cookie Pattern

```typescript
const supabase = createServerClient(url, key, {
  cookies: {
    getAll: () => request.cookies.getAll(),
    setAll: (cookies) => {
      cookies.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options);
      });
    },
  },
});
```
