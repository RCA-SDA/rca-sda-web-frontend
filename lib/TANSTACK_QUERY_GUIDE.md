# TanStack Query Setup Guide

TanStack Query (formerly React Query) is now configured for backend integration.

## Configuration Files

- **`lib/query-client.ts`** - Query client configuration with default options
- **`lib/providers/QueryProvider.tsx`** - Client-side provider wrapper
- **`lib/api/client.ts`** - API client with error handling
- **`lib/hooks/useExample.ts`** - Example hooks for CRUD operations

## Environment Variables

Add your backend API URL to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Usage Examples

### 1. Fetching Data (GET)

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export default function MembersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: () => apiClient<{ members: Member[] }>('/members'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.members.map(member => (
        <div key={member.id}>{member.name}</div>
      ))}
    </div>
  );
}
```

### 2. Creating Data (POST)

```tsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export default function CreateMemberForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newMember: MemberInput) =>
      apiClient('/members', {
        method: 'POST',
        body: JSON.stringify(newMember),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name: 'John Doe', email: 'john@example.com' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create Member'}
      </button>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
    </form>
  );
}
```

### 3. Updating Data (PUT/PATCH)

```tsx
const updateMutation = useMutation({
  mutationFn: ({ id, data }: { id: string; data: Partial<Member> }) =>
    apiClient(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  onSuccess: (_, variables) => {
    queryClient.invalidateQueries({ queryKey: ['members'] });
    queryClient.invalidateQueries({ queryKey: ['members', variables.id] });
  },
});
```

### 4. Deleting Data (DELETE)

```tsx
const deleteMutation = useMutation({
  mutationFn: (id: string) =>
    apiClient(`/members/${id}`, { method: 'DELETE' }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['members'] });
  },
});
```

### 5. Custom Hooks Pattern

Create reusable hooks in `lib/hooks/`:

```tsx
// lib/hooks/useMembers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export function useMembers() {
  return useQuery({
    queryKey: ['members'],
    queryFn: () => apiClient<{ members: Member[] }>('/members'),
  });
}

export function useCreateMember() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: MemberInput) =>
      apiClient('/members', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}
```

## Advanced Features

### Pagination

```tsx
const { data } = useQuery({
  queryKey: ['members', page],
  queryFn: () => apiClient(`/members?page=${page}&limit=10`),
  keepPreviousData: true,
});
```

### Optimistic Updates

```tsx
const mutation = useMutation({
  mutationFn: updateMember,
  onMutate: async (newData) => {
    await queryClient.cancelQueries({ queryKey: ['members'] });
    const previousData = queryClient.getQueryData(['members']);
    
    queryClient.setQueryData(['members'], (old) => ({
      ...old,
      members: old.members.map(m => 
        m.id === newData.id ? { ...m, ...newData } : m
      ),
    }));
    
    return { previousData };
  },
  onError: (err, newData, context) => {
    queryClient.setQueryData(['members'], context.previousData);
  },
});
```

### Authentication Headers

Update `lib/api/client.ts` to include auth tokens:

```tsx
export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem('token'); // or use cookies

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  };

  // ... rest of the code
}
```

## DevTools

The React Query DevTools are included in development mode. Click the TanStack logo in the bottom corner to inspect queries.

## Best Practices

1. **Use query keys consistently** - `['resource', id]` pattern
2. **Invalidate queries after mutations** - Keep data fresh
3. **Handle loading and error states** - Better UX
4. **Create custom hooks** - Reusable and maintainable
5. **Set appropriate staleTime** - Balance freshness and performance
6. **Use enabled option** - Conditional queries

## Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Query Best Practices](https://tkdodo.eu/blog/practical-react-query)
