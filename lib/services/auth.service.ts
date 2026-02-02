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
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
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
    apiClient<{ user: User }>('/auth/me'),

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
