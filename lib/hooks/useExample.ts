import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { membersService, type CreateMemberInput, type UpdateMemberInput } from '@/lib/services';

// Example: Fetch all members
export function useMembers() {
  return useQuery({
    queryKey: ['members'],
    queryFn: membersService.getAll,
  });
}

// Example: Fetch single member
export function useMember(id: string) {
  return useQuery({
    queryKey: ['members', id],
    queryFn: () => membersService.getById(id),
    enabled: !!id,
  });
}

// Example: Create member mutation
export function useCreateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMemberInput) => membersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}

// Example: Update member mutation
export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMemberInput }) =>
      membersService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['members', variables.id] });
    },
  });
}

// Example: Delete member mutation
export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => membersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}
