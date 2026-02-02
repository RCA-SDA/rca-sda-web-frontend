import { apiClient } from '@/lib/api/client';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPostInput {
  title: string;
  content: string;
  excerpt?: string;
  author: string;
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {}

export const blogService = {
  getAll: (params?: { page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    
    return apiClient<{ posts: BlogPost[]; total: number }>(
      `/blog${query.toString() ? `?${query.toString()}` : ''}`
    );
  },

  getById: (id: string) => 
    apiClient<{ post: BlogPost }>(`/blog/${id}`),

  create: (data: CreateBlogPostInput) =>
    apiClient<{ post: BlogPost }>('/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateBlogPostInput) =>
    apiClient<{ post: BlogPost }>(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiClient<{ success: boolean }>(`/blog/${id}`, {
      method: 'DELETE',
    }),
};
