import { apiClient } from '@/lib/api/client';

// Family interfaces based on the API response
export interface FamilyMember {
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
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
    username: string;
}

export interface FamilyReport {
    id: number;
    attendedStartingSabbathCeremony: boolean;
    sevenDayBibleStudy: boolean;
    vistedPeople: boolean;
    wasVisited: boolean;
    helped: boolean;
    wasHelped: boolean;
    user: FamilyMember;
    family: string;
    attendance: {
        id: number;
        sabbathDate: string;
        reports: string[];
        userReports: {
            [key: string]: string;
        };
    };
}

export interface Family {
    id: number;
    name: string;
    members: FamilyMember[];
    reports: FamilyReport[];
}

export interface CreateFamilyInput {
    name: string;
    fatherId?: string;
    motherId?: string;
}

export interface UpdateFamilyInput extends Partial<CreateFamilyInput> { }

export interface User {
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
    username: string;
    enabled: boolean;
}

export const familyService = {
    // Get all families
    getAll: () => apiClient<Family[]>('/families'),

    // Get family by ID
    getById: (id: number) => apiClient<Family>(`/families/${id}`),

    // Create new family
    create: (data: CreateFamilyInput) => {
        console.log('📝 Creating family with data:', data);

        // Send all fields as requested by the user
        const fullRequestData = {
            name: data.name,
            fatherId: data.fatherId,
            motherId: data.motherId,
        };

        console.log('📋 Full family request data:', JSON.stringify(fullRequestData, null, 2));

        return apiClient<Family>('/families', {
            method: 'POST',
            body: JSON.stringify(fullRequestData),
        }).catch(error => {
            console.error('❌ Family creation failed:', error);

            // Check if it's an authentication issue
            if (error?.status === 403) {
                throw new Error('Your session has expired. Please log out and log back in to continue.');
            }

            // Check for other specific errors
            if (error?.status === 400) {
                throw new Error('Invalid family data. Please check all required fields.');
            }

            if (error?.status === 500) {
                throw new Error('Server error. Please try again later.');
            }

            throw new Error('Family creation failed. Please check your connection and try again.');
        });
    },

    // Update family
    update: (id: number, data: UpdateFamilyInput) =>
        apiClient<Family>(`/families/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    // Delete family
    delete: (id: number) =>
        apiClient<void>(`/families/${id}`, {
            method: 'DELETE',
        }),

    // Search families
    search: (query: string) => apiClient<Family[]>(`/families/search?q=${query}`),

    // Get all users for dropdown selection
    getAllUsers: () => apiClient<User[]>('/users'),

    // Get users by gender for dropdown selection
    getUsersByGender: (gender: 'MALE' | 'FEMALE') => apiClient<User[]>(`/users?gender=${gender}`),

    // Add member to family
    addMemberToFamily: (familyId: number, userId: number) => {
        console.log(`👪 Adding member ${userId} to family ${familyId}`);

        return apiClient<void>(`/families/${familyId}/members/${userId}`, {
            method: 'POST',
        }).catch(error => {
            console.error('❌ Failed to add member to family:', error);

            // Check if it's an authentication issue
            if (error?.status === 403) {
                throw new Error('Your session has expired. Please log out and log back in to continue.');
            }

            // Check for other specific errors
            if (error?.status === 404) {
                throw new Error('Family or member not found. Please check the IDs and try again.');
            }

            if (error?.status === 400) {
                throw new Error('Invalid request. The member may already be in this family.');
            }

            if (error?.status === 500) {
                throw new Error('Server error. Please try again later.');
            }

            throw new Error('Failed to add member to family. Please check your connection and try again.');
        });
    },
};
