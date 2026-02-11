import { apiClient } from '@/lib/api/client';

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'USER' | 'ADMIN';
    gender: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
}

export const authService = {
    login: (data: LoginInput) =>
        apiClient<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    register: (data: RegisterInput) =>
        apiClient<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    logout: () =>
        apiClient<{ success: boolean }>('/auth/logout', {
            method: 'POST',
        }),

    getCurrentUser: () =>
        apiClient<{ user: User }>('/users/me'),

    forgotPassword: (email: string) =>
        apiClient<{ success: boolean }>('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        }),

    resetPassword: (token: string, password: string) =>
        apiClient<{ success: boolean }>('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, password }),
        }),
};
