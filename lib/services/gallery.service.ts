import { apiClient } from '@/lib/api/client';

export interface GalleryItem {
    id: number;
    title: string;
    description: string;
    galleryItemUrl: string;
}

export interface CreateGalleryInput {
    title: string;
    description: string;
    galleryItemUrl: string;
}

export const galleryService = {
    // Get all gallery items
    getAll: () => apiClient<GalleryItem[]>('/gallery'),

    // Get gallery item by ID
    getById: (id: number) => apiClient<GalleryItem>(`/gallery/${id}`),

    // Create new gallery item
    create: async (data: CreateGalleryInput) => {
        return apiClient<GalleryItem>('/gallery', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // Update gallery item
    update: (id: number, data: Partial<CreateGalleryInput>) => {
        return apiClient<GalleryItem>(`/gallery/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    // Delete gallery item
    delete: (id: number) =>
        apiClient<void>(`/gallery/${id}`, {
            method: 'DELETE',
        }),

    // Search gallery items
    search: (query: string) => apiClient<GalleryItem[]>(`/gallery/search?q=${query}`),
};
