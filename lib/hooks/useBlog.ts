import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  blogService, 
  type BlogPost, 
  type CreateBlogPostInput,
  type UpdateBlogPostInput 
} from '@/lib/services/blog.service';

// Get all blog posts
export function useBlogPosts(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['blogPosts', params],
    queryFn: () => blogService.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get blog post by ID
export function useBlogPost(id: number) {
  return useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => blogService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Create blog post
export function useCreateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogPostInput) => blogService.create(data),
    onSuccess: () => {
      console.log('✅ Blog post created successfully');
      // Invalidate blog posts list to refetch
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
    onError: (error) => {
      console.error('❌ Failed to create blog post:', error);
    },
  });
}

// Update blog post
export function useUpdateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBlogPostInput }) =>
      blogService.update(id, data),
    onSuccess: (_, variables) => {
      console.log('✅ Blog post updated successfully');
      // Invalidate specific post and blog posts list
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPost', variables.id] });
    },
    onError: (error) => {
      console.error('❌ Failed to update blog post:', error);
    },
  });
}

// Delete blog post
export function useDeleteBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => blogService.delete(id),
    onSuccess: () => {
      console.log('✅ Blog post deleted successfully');
      // Invalidate blog posts list to refetch
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
    onError: (error) => {
      console.error('❌ Failed to delete blog post:', error);
    },
  });
}

// Search blog posts
export function useSearchBlogPosts(query: string) {
  return useQuery({
    queryKey: ['blogPosts', 'search', query],
    queryFn: () => blogService.search(query),
    enabled: query.length > 0, // Only search when there's a query
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
