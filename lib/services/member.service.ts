import { apiClient } from '@/lib/api/client';

// Member interfaces based on the API response
export interface Attendance {
    id: number;
    sabbathDate: string;
    reports: string[];
    userReports: {
        additionalProp1: string;
        additionalProp2: string;
        additionalProp3: string;
    };
}

export interface FamilyReport {
    id: number;
    attendedStartingSabbathCeremony: boolean;
    sevenDayBibleStudy: boolean;
    vistedPeople: boolean;
    wasVisited: boolean;
    helped: boolean;
    wasHelped: boolean;
    user: string;
    family: string;
    attendance: Attendance;
}

export interface Family {
    id: number;
    name: string;
    members: string[];
    reports: FamilyReport[];
}

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

export interface AttendedMeeting {
    id: number;
    agenda_items: string[];
    decisions: string[];
    notes: string;
    attendees: string[];
}

export interface Member {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: 'MALE' | 'FEMALE';
    level: string;
    status: string;
    role: string;
    family: Family;
    choir: Choir;
    attendedMeetings: AttendedMeeting[];
    createdAt: string;
    createdBy: string;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    username: string;
    enabled: boolean;
}

export interface CreateMemberInput {
    firstName: string;
    lastName: string;
    email: string;
    gender: 'MALE' | 'FEMALE';
    level: string;
    status: string;
    role: string;
    username: string;
    password?: string;
}

export interface UpdateMemberInput extends Partial<CreateMemberInput> { }

export const memberService = {
    // Get all members
    getAll: () => apiClient<Member[]>('/users'),

    // Get member by ID
    getById: (id: number) => apiClient<Member>(`/users/${id}`),

    // Create new member
    create: (data: CreateMemberInput) =>
        apiClient<Member>('/users', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    // Update member
    update: (id: number, data: UpdateMemberInput) =>
        apiClient<Member>(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    // Delete member
    delete: (id: number) =>
        apiClient<void>(`/users/${id}`, {
            method: 'DELETE',
        }),

    // Search members
    search: (query: string) => apiClient<Member[]>(`/users/search?q=${query}`),

    // Get member statistics
    getStats: () => apiClient<{ total: number; active: number; inactive: number }>('/users/stats'),
};
