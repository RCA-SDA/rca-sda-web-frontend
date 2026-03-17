import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { familyService, Family, CreateFamilyInput, UpdateFamilyInput, User } from '@/lib/services/family.service';

// Hook to fetch all families
export const useFamilies = () => {
    return useQuery({
        queryKey: ['families'],
        queryFn: () => familyService.getAll(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to fetch a single family by ID
export const useFamily = (id: number) => {
    return useQuery({
        queryKey: ['family', id],
        queryFn: () => familyService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to create a new family
export const useCreateFamily = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateFamilyInput) => familyService.create(data),
        onSuccess: () => {
            // Invalidate families query to refetch
            queryClient.invalidateQueries({ queryKey: ['families'] });
            console.log('✅ Family created successfully');
        },
        onError: (error) => {
            console.error('❌ Error creating family:', error);
        },
    });
};

// Hook to update a family
export const useUpdateFamily = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateFamilyInput }) =>
            familyService.update(id, data),
        onSuccess: (_, { id }) => {
            // Invalidate both families list and specific family
            queryClient.invalidateQueries({ queryKey: ['families'] });
            queryClient.invalidateQueries({ queryKey: ['family', id] });
            console.log('✅ Family updated successfully');
        },
        onError: (error) => {
            console.error('❌ Error updating family:', error);
        },
    });
};

// Hook to delete a family
export const useDeleteFamily = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => familyService.delete(id),
        onSuccess: () => {
            // Invalidate families query to refetch
            queryClient.invalidateQueries({ queryKey: ['families'] });
            console.log('✅ Family deleted successfully');
        },
        onError: (error) => {
            console.error('❌ Error deleting family:', error);
        },
    });
};

// Hook to fetch all users for dropdown selection
export const useAllUsers = () => {
    return useQuery({
        queryKey: ['users', 'all'],
        queryFn: () => familyService.getAllUsers(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to fetch male users for father selection
export const useMaleUsers = () => {
    return useQuery({
        queryKey: ['users', 'male'],
        queryFn: () => familyService.getUsersByGender('MALE'),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to fetch female users for mother selection
export const useFemaleUsers = () => {
    return useQuery({
        queryKey: ['users', 'female'],
        queryFn: () => familyService.getUsersByGender('FEMALE'),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to add member to family
export const useAddMemberToFamily = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ familyId, userId }: { familyId: number; userId: number }) =>
            familyService.addMemberToFamily(familyId, userId),
        onSuccess: () => {
            // Invalidate families query to refetch
            queryClient.invalidateQueries({ queryKey: ['families'] });
            console.log('✅ Member added to family successfully');
        },
        onError: (error) => {
            console.error('❌ Error adding member to family:', error);
        },
    });
};
