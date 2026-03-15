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

        // Check content length and warn if too long
        if (data.content.length > 10000) {
            console.warn('⚠️ Content is very long, this might cause issues:', data.content.length, 'characters');
        }

        // Always send all fields as requested, with fallback to minimal if needed
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
            console.error('❌ Full request failed:', error);
            if (error?.status === 400 || error?.status === 500 || error?.status === 403) {
                console.log('🔄 Backend rejected full request, trying minimal fields...');

                // For very long content, try truncating it
                const truncatedContent = data.content.length > 5000
                    ? data.content.substring(0, 5000) + '... (content truncated)'
                    : data.content;

                // Fallback to minimal fields with potentially truncated content
                const minimalData = {
                    title: data.title,
                    content: truncatedContent,
                    author: data.author,
                };

                console.log('📋 Minimal request data:', JSON.stringify(minimalData, null, 2));

                return apiClient<BlogPost>('/blogs', {
                    method: 'POST',
                    body: JSON.stringify(minimalData),
                }).catch(minimalError => {
                    console.error('❌ Minimal request also failed:', minimalError);

                    // Check if it's an authentication issue
                    if (minimalError?.status === 403) {
                        throw new Error('Your session has expired. Please log out and log back in to continue.');
                    }

                    // Check if it's a content length issue
                    if (data.content.length > 5000) {
                        throw new Error('Content is too long. Please keep your blog post under 5000 characters.');
                    }

                    throw new Error('Blog creation failed. Please check your connection and try again.');
                });
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
