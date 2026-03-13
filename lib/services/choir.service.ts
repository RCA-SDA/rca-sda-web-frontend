import { apiClient } from '@/lib/api/client';

// Choir interfaces based on API response
export interface ChoirSong {
    id: number;
    title: string;
    coverUrl: string;
    description: string;
    external_url: string;
    lyrics: string;
    audio_url: string;
    choir: string;
}

export interface Choir {
    id: number;
    name: string;
    choirMembers: string[];
    choirSongs: ChoirSong[];
}

export interface CreateChoirInput {
    name: string;
    choirMembers?: string[];
}

export interface CreateChoirSongInput {
    title: string;
    coverUrl?: string;
    description?: string;
    external_url?: string;
    lyrics?: string;
    audio_url?: string;
    choir: string;
}

export interface UpdateChoirInput extends Partial<CreateChoirInput> { }
export interface UpdateChoirSongInput extends Partial<CreateChoirSongInput> { }

export const choirService = {
    // Get all choirs
    getAll: () => apiClient<Choir[]>('/choirs'),

    // Get choir by ID
    getById: (id: number) => apiClient<Choir>(`/choirs/${id}`),

    // Create new choir
    create: async (data: CreateChoirInput) => {
        try {
            return await apiClient<Choir>('/choirs', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        } catch (error: any) {
            // If 415 error, the backend might have configuration issues
            if (error?.status === 415) {
                console.warn('⚠️ Backend POST endpoint not accepting JSON - this is a server configuration issue');
                throw new Error('Choir creation temporarily unavailable due to server configuration');
            }
            throw error;
        }
    },

    // Update choir
    update: (id: number, data: UpdateChoirInput) =>
        apiClient<Choir>(`/choirs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    // Delete choir
    delete: (id: number) =>
        apiClient<void>(`/choirs/${id}`, {
            method: 'DELETE',
        }),

    // Get choir songs
    getSongs: (choirId: number) => apiClient<ChoirSong[]>(`/choirs/${choirId}/songs`),

    // Create choir song
    createSong: (choirId: number, data: CreateChoirSongInput) =>
        apiClient<ChoirSong>(`/choirs/${choirId}/songs`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    // Update choir song
    updateSong: (choirId: number, songId: number, data: UpdateChoirSongInput) =>
        apiClient<ChoirSong>(`/choirs/${choirId}/songs/${songId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    // Delete choir song
    deleteSong: (choirId: number, songId: number) =>
        apiClient<void>(`/choirs/${choirId}/songs/${songId}`, {
            method: 'DELETE',
        }),

    // Search choirs
    search: (query: string) => apiClient<Choir[]>(`/choirs/search?q=${query}`),
};
