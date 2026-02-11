import { apiClient } from '@/lib/api/client';

export interface Member {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateMemberInput {
    name: string;
    email: string;
    phone?: string;
    role?: string;
}

export interface UpdateMemberInput extends Partial<CreateMemberInput> { }

export const membersService = {
    getAll: () =>
        apiClient<{ members: Member[] }>('/members'),

    getById: (id: string) =>
        apiClient<{ member: Member }>(`/members/${id}`),

    create: (data: CreateMemberInput) =>
        apiClient<{ member: Member }>('/members', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (id: string, data: UpdateMemberInput) =>
        apiClient<{ member: Member }>(`/members/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id: string) =>
        apiClient<{ success: boolean }>(`/members/${id}`, {
            method: 'DELETE',
        }),

    search: (query: string) =>
        apiClient<{ members: Member[] }>(`/members/search?q=${encodeURIComponent(query)}`),
};
