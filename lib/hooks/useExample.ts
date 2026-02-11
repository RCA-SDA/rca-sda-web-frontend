import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { memberService, type CreateMemberInput, type UpdateMemberInput } from '@/lib/services';

// Example: Fetch all members
export function useMembers() {
    return useQuery({
        queryKey: ['members'],
        queryFn: memberService.getAll,
    });
}

// Example: Fetch single member
export function useMember(id: number) {
    return useQuery({
        queryKey: ['members', id],
        queryFn: () => memberService.getById(id),
        enabled: !!id,
    });
}

// Example: Create member
export function useCreateMember() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateMemberInput) => memberService.create(data),
        onSuccess: () => {
            console.log('Member created successfully');
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
        onError: (error) => {
            console.error('Failed to create member:', error);
        },
    });
}

// Example: Update member
export function useUpdateMember() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateMemberInput }) =>
            memberService.update(id, data),
        onSuccess: (_, variables) => {
            console.log('Member updated successfully');
            queryClient.invalidateQueries({ queryKey: ['members'] });
            queryClient.invalidateQueries({ queryKey: ['members', variables.id] });
        },
        onError: (error) => {
            console.error('Failed to update member:', error);
        },
    });
}

// Example: Delete member
export function useDeleteMember() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => memberService.delete(id),
        onSuccess: () => {
            console.log('Member deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
        onError: (error) => {
            console.error('Failed to delete member:', error);
        },
    });
}
