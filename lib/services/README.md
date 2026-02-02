# Services Layer

This folder contains service modules that encapsulate all API calls to the backend. Services provide a clean separation between API logic and React components.

## Structure

```
lib/services/
├── index.ts              # Barrel export for all services
├── auth.service.ts       # Authentication endpoints
├── members.service.ts    # Member management endpoints
├── blog.service.ts       # Blog post endpoints
└── README.md            # This file
```

## Usage Pattern

### 1. Define Service

Each service exports:
- TypeScript interfaces for data types
- Service object with methods for API calls

```typescript
// lib/services/members.service.ts
export interface Member {
  id: string;
  name: string;
  email: string;
}

export const membersService = {
  getAll: () => apiClient<{ members: Member[] }>('/members'),
  getById: (id: string) => apiClient<{ member: Member }>(`/members/${id}`),
  create: (data: CreateMemberInput) => apiClient('/members', { method: 'POST', ... }),
  // ... more methods
};
```

### 2. Use in Hooks

Create custom hooks that use services with TanStack Query:

```typescript
// lib/hooks/useMembers.ts
import { useQuery } from '@tanstack/react-query';
import { membersService } from '@/lib/services';

export function useMembers() {
  return useQuery({
    queryKey: ['members'],
    queryFn: membersService.getAll,
  });
}
```

### 3. Use in Components

```typescript
'use client';

import { useMembers } from '@/lib/hooks/useMembers';

export default function MembersPage() {
  const { data, isLoading } = useMembers();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data?.members.map(member => (
        <div key={member.id}>{member.name}</div>
      ))}
    </div>
  );
}
```

## Creating New Services

### Template

```typescript
import { apiClient } from '@/lib/api/client';

// 1. Define types
export interface YourResource {
  id: string;
  // ... other fields
}

export interface CreateYourResourceInput {
  // ... fields
}

export interface UpdateYourResourceInput extends Partial<CreateYourResourceInput> {}

// 2. Create service object
export const yourResourceService = {
  getAll: (params?: { page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    
    return apiClient<{ items: YourResource[]; total: number }>(
      `/your-resource${query.toString() ? `?${query.toString()}` : ''}`
    );
  },

  getById: (id: string) => 
    apiClient<{ item: YourResource }>(`/your-resource/${id}`),

  create: (data: CreateYourResourceInput) =>
    apiClient<{ item: YourResource }>('/your-resource', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateYourResourceInput) =>
    apiClient<{ item: YourResource }>(`/your-resource/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<{ success: boolean }>(`/your-resource/${id}`, {
      method: 'DELETE',
    }),
};
```

### Then export it

```typescript
// lib/services/index.ts
export * from './your-resource.service';
```

## Benefits

1. **Centralized API Logic** - All API calls in one place
2. **Type Safety** - Full TypeScript support with interfaces
3. **Reusability** - Services can be used in multiple hooks/components
4. **Testability** - Easy to mock services for testing
5. **Maintainability** - Changes to API structure only affect service files
6. **Consistency** - Standardized patterns across the application

## Best Practices

1. **One service per resource** - Keep services focused
2. **Export types** - Share interfaces between service and consumers
3. **Use descriptive names** - `membersService.getAll()` not `membersService.fetch()`
4. **Handle query params** - Use URLSearchParams for clean query building
5. **Return typed responses** - Always specify generic types for apiClient
6. **Keep services pure** - No React hooks or state in services
7. **Document complex endpoints** - Add JSDoc comments for clarity

## Example Services

### Auth Service
- `login()` - User authentication
- `register()` - User registration
- `logout()` - End session
- `getCurrentUser()` - Get authenticated user
- `forgotPassword()` - Request password reset
- `resetPassword()` - Reset password with token

### Members Service
- `getAll()` - Fetch all members
- `getById()` - Fetch single member
- `create()` - Create new member
- `update()` - Update existing member
- `delete()` - Delete member
- `search()` - Search members

### Blog Service
- `getAll()` - Fetch posts with pagination
- `getById()` - Fetch single post
- `create()` - Create new post
- `update()` - Update existing post
- `delete()` - Delete post
