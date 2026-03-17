import { apiClient } from '@/lib/api/client';

export interface MeetingNoteAttendee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: 'MALE' | 'FEMALE';
    level: string;
    status: string;
    role: string;
    createdAt: string;
    createdBy: string;
    membersAdded: number;
    galleryItems: number;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    username: string;
    enabled: boolean;
}

export interface MeetingNote {
    id: number;
    agenda_items: string[];
    decisions: string[];
    notes: string;
    attendees: MeetingNoteAttendee[];
    // Optional fields that might be added later - default to 0 or empty
    title?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    recorder?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateMeetingNoteInput {
    agendaItems: string[];
    decisions: string[];
    notes: string;
    attendeeIds: number[];
}

export const meetingNotesService = {
    // Create new meeting note
    create: (data: CreateMeetingNoteInput) => {
        console.log('📝 Creating meeting note with data:', data);

        return apiClient<MeetingNote>('/meeting-notes', {
            method: 'POST',
            body: JSON.stringify(data),
        }).catch(error => {
            console.error('❌ Failed to create meeting note:', error);

            // Check if it's an authentication issue
            if (error?.status === 403) {
                throw new Error('Your session has expired. Please log out and log back in to continue.');
            }

            // Check for other specific errors
            if (error?.status === 400) {
                throw new Error('Invalid meeting note data. Please check all required fields.');
            }

            if (error?.status === 500) {
                throw new Error('Server error. Please try again later.');
            }

            // Check if it's a JSON parsing error (response was successful but not JSON)
            if (error?.message === 'Invalid JSON response from server') {
                console.log('✅ Meeting note created successfully (non-JSON response)');
                return; // Return success since the actual operation worked
            }

            throw new Error('Failed to create meeting note. Please check your connection and try again.');
        });
    },

    // Get all meeting notes
    getAll: () => apiClient<MeetingNote[]>('/meeting-notes'),

    // Get meeting note by ID
    getById: (id: number) => apiClient<MeetingNote>(`/meeting-notes/${id}`),

    // Update meeting note
    update: (id: number, data: Partial<CreateMeetingNoteInput>) =>
        apiClient<MeetingNote>(`/meeting-notes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    // Delete meeting note
    delete: (id: number) =>
        apiClient<void>(`/meeting-notes/${id}`, {
            method: 'DELETE',
        }),
};
