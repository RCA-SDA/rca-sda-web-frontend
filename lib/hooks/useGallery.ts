import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  galleryService, 
  type GalleryItem, 
  type CreateGalleryInput 
} from '@/lib/services/gallery.service';

// Get all gallery items
export function useGallery() {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: () => galleryService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get gallery item by ID
export function useGalleryItem(id: number) {
  return useQuery({
    queryKey: ['gallery', id],
    queryFn: () => galleryService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create gallery item
export function useCreateGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGalleryInput) => galleryService.create(data),
    onSuccess: () => {
      console.log('✅ Gallery item created successfully');
      // Invalidate gallery list to refetch
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
    onError: (error) => {
      console.error('❌ Failed to create gallery item:', error);
    },
  });
}

// Update gallery item
export function useUpdateGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateGalleryInput> }) =>
      galleryService.update(id, data),
    onSuccess: (_, variables) => {
      console.log('✅ Gallery item updated successfully');
      // Invalidate specific item and gallery list
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      queryClient.invalidateQueries({ queryKey: ['gallery', variables.id] });
    },
    onError: (error) => {
      console.error('❌ Failed to update gallery item:', error);
    },
  });
}

// Delete gallery item
export function useDeleteGallery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => galleryService.delete(id),
    onSuccess: () => {
      console.log('✅ Gallery item deleted successfully');
      // Invalidate gallery list to refetch
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
    onError: (error) => {
      console.error('❌ Failed to delete gallery item:', error);
    },
  });
}

// Search gallery items
export function useSearchGallery(query: string) {
  return useQuery({
    queryKey: ['gallery', 'search', query],
    queryFn: () => galleryService.search(query),
    enabled: query.length > 0, // Only search when there's a query
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
