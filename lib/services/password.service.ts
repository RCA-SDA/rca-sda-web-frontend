import { apiClient } from '@/lib/api/client';

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  email: string;
  token: string;
  password: string;
}

export const passwordService = {
  // Forgot password
  forgotPassword: (data: ForgotPasswordInput) =>
    apiClient<string>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // Request password reset
  requestPasswordReset: (data: ForgotPasswordInput) =>
    apiClient<string>('/auth/request-password-reset', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // Reset password
  resetPassword: (data: ResetPasswordInput) =>
    apiClient<string>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
