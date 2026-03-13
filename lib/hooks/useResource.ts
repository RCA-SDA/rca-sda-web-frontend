import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    resourceService,
    type Resource,
    type CreateResourceInput,
    type UpdateResourceInput
} from '@/lib/services/resource.service';

// Get all resources
export function useResources(params?: { page?: number; limit?: number }) {
    return useQuery({
        queryKey: ['resources', params],
        queryFn: () => resourceService.getAll(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Get resource by ID
export function useResource(id: number) {
    return useQuery({
        queryKey: ['resource', id],
        queryFn: () => resourceService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Create resource
export function useCreateResource() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateResourceInput) => resourceService.create(data),
        onSuccess: () => {
            console.log('✅ Resource created successfully');
            // Invalidate resources list to refetch
            queryClient.invalidateQueries({ queryKey: ['resources'] });
        },
        onError: (error) => {
            console.error('❌ Failed to create resource:', error);
        },
    });
}

// Update resource
export function useUpdateResource() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateResourceInput }) =>
            resourceService.update(id, data),
        onSuccess: (_, variables) => {
            console.log('✅ Resource updated successfully');
            // Invalidate specific resource and resources list
            queryClient.invalidateQueries({ queryKey: ['resources'] });
            queryClient.invalidateQueries({ queryKey: ['resource', variables.id] });
        },
        onError: (error) => {
            console.error('❌ Failed to update resource:', error);
        },
    });
}

// Delete resource
export function useDeleteResource() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => resourceService.delete(id),
        onSuccess: () => {
            console.log('✅ Resource deleted successfully');
            // Invalidate resources list to refetch
            queryClient.invalidateQueries({ queryKey: ['resources'] });
        },
        onError: (error) => {
            console.error('❌ Failed to delete resource:', error);
        },
    });
}

// Search resources
export function useSearchResources(query: string) {
    return useQuery({
        queryKey: ['resources', 'search', query],
        queryFn: () => resourceService.search(query),
        enabled: query.length > 0, // Only search when there's a query
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

// Upload cover image
export function useUploadCoverImage() {
    return useMutation({
        mutationFn: (file: File) => resourceService.uploadCover(file),
        onSuccess: (data) => {
            console.log('✅ Cover image uploaded successfully:', data.url);
        },
        onError: (error) => {
            console.error('❌ Failed to upload cover image:', error);
        },
    });
}
