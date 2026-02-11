import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memberService, type Member, type CreateMemberInput, type UpdateMemberInput } from '@/lib/services/member.service';

// Get all members
export function useMembers() {
  return useQuery({
    queryKey: ['members'],
    queryFn: () => memberService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get member by ID
export function useMember(id: number) {
  return useQuery({
    queryKey: ['members', id],
    queryFn: () => memberService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create member
export function useCreateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMemberInput) => memberService.create(data),
    onSuccess: () => {
      console.log('✅ Member created successfully');
      // Invalidate members list to refetch
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: (error) => {
      console.error('❌ Failed to create member:', error);
    },
  });
}

// Update member
export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMemberInput }) =>
      memberService.update(id, data),
    onSuccess: (_, variables) => {
      console.log('✅ Member updated successfully');
      // Invalidate specific member and members list
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['members', variables.id] });
    },
    onError: (error) => {
      console.error('❌ Failed to update member:', error);
    },
  });
}

// Delete member
export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => memberService.delete(id),
    onSuccess: () => {
      console.log('✅ Member deleted successfully');
      // Invalidate members list to refetch
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: (error) => {
      console.error('❌ Failed to delete member:', error);
    },
  });
}

// Search members
export function useSearchMembers(query: string) {
  return useQuery({
    queryKey: ['members', 'search', query],
    queryFn: () => memberService.search(query),
    enabled: query.length > 0, // Only search when there's a query
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get member statistics
export function useMemberStats() {
  return useQuery({
    queryKey: ['members', 'stats'],
    queryFn: () => memberService.getStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
