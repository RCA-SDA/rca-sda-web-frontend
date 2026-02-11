import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  choirService, 
  type Choir, 
  type CreateChoirInput, 
  type UpdateChoirInput,
  type ChoirSong,
  type CreateChoirSongInput,
  type UpdateChoirSongInput
} from '@/lib/services/choir.service';

// Get all choirs
export function useChoirs() {
  return useQuery({
    queryKey: ['choirs'],
    queryFn: () => choirService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get choir by ID
export function useChoir(id: number) {
  return useQuery({
    queryKey: ['choirs', id],
    queryFn: () => choirService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create choir
export function useCreateChoir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateChoirInput) => choirService.create(data),
    onSuccess: () => {
      console.log('✅ Choir created successfully');
      // Invalidate choirs list to refetch
      queryClient.invalidateQueries({ queryKey: ['choirs'] });
    },
    onError: (error) => {
      console.error('❌ Failed to create choir:', error);
    },
  });
}

// Update choir
export function useUpdateChoir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateChoirInput }) =>
      choirService.update(id, data),
    onSuccess: (_, variables) => {
      console.log('✅ Choir updated successfully');
      // Invalidate specific choir and choirs list
      queryClient.invalidateQueries({ queryKey: ['choirs'] });
      queryClient.invalidateQueries({ queryKey: ['choirs', variables.id] });
    },
    onError: (error) => {
      console.error('❌ Failed to update choir:', error);
    },
  });
}

// Delete choir
export function useDeleteChoir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => choirService.delete(id),
    onSuccess: () => {
      console.log('✅ Choir deleted successfully');
      // Invalidate choirs list to refetch
      queryClient.invalidateQueries({ queryKey: ['choirs'] });
    },
    onError: (error) => {
      console.error('❌ Failed to delete choir:', error);
    },
  });
}

// Get choir songs
export function useChoirSongs(choirId: number) {
  return useQuery({
    queryKey: ['choirs', choirId, 'songs'],
    queryFn: () => choirService.getSongs(choirId),
    enabled: !!choirId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create choir song
export function useCreateChoirSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ choirId, data }: { choirId: number; data: CreateChoirSongInput }) =>
      choirService.createSong(choirId, data),
    onSuccess: (_, variables) => {
      console.log('✅ Choir song created successfully');
      // Invalidate songs list for the choir
      queryClient.invalidateQueries({ queryKey: ['choirs', variables.choirId, 'songs'] });
    },
    onError: (error) => {
      console.error('❌ Failed to create choir song:', error);
    },
  });
}

// Update choir song
export function useUpdateChoirSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ choirId, songId, data }: { 
      choirId: number; 
      songId: number; 
      data: UpdateChoirSongInput 
    }) => choirService.updateSong(choirId, songId, data),
    onSuccess: (_, variables) => {
      console.log('✅ Choir song updated successfully');
      // Invalidate songs list for the choir
      queryClient.invalidateQueries({ queryKey: ['choirs', variables.choirId, 'songs'] });
    },
    onError: (error) => {
      console.error('❌ Failed to update choir song:', error);
    },
  });
}

// Delete choir song
export function useDeleteChoirSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ choirId, songId }: { choirId: number; songId: number }) =>
      choirService.deleteSong(choirId, songId),
    onSuccess: (_, variables) => {
      console.log('✅ Choir song deleted successfully');
      // Invalidate songs list for the choir
      queryClient.invalidateQueries({ queryKey: ['choirs', variables.choirId, 'songs'] });
    },
    onError: (error) => {
      console.error('❌ Failed to delete choir song:', error);
    },
  });
}

// Search choirs
export function useSearchChoirs(query: string) {
  return useQuery({
    queryKey: ['choirs', 'search', query],
    queryFn: () => choirService.search(query),
    enabled: query.length > 0, // Only search when there's a query
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
