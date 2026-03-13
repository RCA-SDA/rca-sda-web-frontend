import { apiClient } from '@/lib/api/client';

export interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
    category: 'NEWS' | 'EVENTS' | 'ANNOUNCEMENTS' | 'TESTIMONIALS' | 'TEACHINGS';
    externalUrl?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateBlogPostInput {
    title: string;
    content: string;
    author: string;
    category: 'NEWS' | 'EVENTS' | 'ANNOUNCEMENTS' | 'TESTIMONIALS' | 'TEACHINGS';
    externalUrl?: string;
    description?: string;
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> { }

export const blogService = {
    getAll: (params?: { page?: number; limit?: number }) => {
        const query = new URLSearchParams();
        if (params?.page) query.append('page', params.page.toString());
        if (params?.limit) query.append('limit', params.limit.toString());

        return apiClient<{ posts: BlogPost[]; total: number }>(
            `/blogs${query.toString() ? `?${query.toString()}` : ''}`
        );
    },

    getById: (id: number) =>
        apiClient<{ post: BlogPost }>(`/blogs/${id}`),

    create: (data: CreateBlogPostInput) => {
        console.log('📝 Creating blog with data:', data);

        // Always send all fields as requested
        const fullRequestData = {
            title: data.title,
            content: data.content,
            author: data.author,
            category: data.category,
            externalUrl: data.externalUrl,
            description: data.description,
        };

        console.log('📋 Full request data:', JSON.stringify(fullRequestData, null, 2));

        return apiClient<BlogPost>('/blogs', {
            method: 'POST',
            body: JSON.stringify(fullRequestData),
        }).catch(error => {
            console.error('❌ Blog creation failed:', error);
            if (error?.status === 400) {
                console.error('⚠️ Bad Request - Backend validation issue');
                console.error('📋 Data sent:', JSON.stringify(fullRequestData, null, 2));
                throw new Error('Blog creation failed due to validation errors. Please check all fields and try again.');
            } else if (error?.status === 403) {
                console.error('🚫 Forbidden - User does not have permission to create blogs');
                throw new Error('You do not have permission to create blog posts. Please contact your administrator.');
            }
            throw error;
        });
    },

    update: (id: number, data: UpdateBlogPostInput) =>
        apiClient<BlogPost>(`/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id: number) =>
        apiClient<{ success: boolean }>(`/blogs/${id}`, {
            method: 'DELETE',
        }),

    search: (query: string) =>
        apiClient<{ posts: BlogPost[] }>(`/blogs/search?q=${query}`),
};
