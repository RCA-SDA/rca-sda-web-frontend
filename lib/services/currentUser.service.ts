import { apiClient } from '@/lib/api/client';

export interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  gender: string;
  classroom?: string | null;
  membersAdded: number;
  galleryItems: number;
  memberSince: string;
  status?: string | null;
  familly?: string;
}

export const currentUserService = {
  // Get current user profile
  getCurrentUser: () =>
    apiClient<CurrentUser>('/users/me'),
};
