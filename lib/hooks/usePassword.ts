import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  passwordService, 
  type ForgotPasswordInput, 
  type ResetPasswordInput 
} from '@/lib/services/password.service';

// Forgot password
export function useForgotPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ForgotPasswordInput) => passwordService.forgotPassword(data),
    onSuccess: () => {
      console.log('✅ Password reset email sent successfully');
    },
    onError: (error) => {
      console.error('❌ Failed to send password reset email:', error);
    },
  });
}

// Request password reset
export function useRequestPasswordReset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ForgotPasswordInput) => passwordService.requestPasswordReset(data),
    onSuccess: () => {
      console.log('✅ Password reset request sent successfully');
    },
    onError: (error) => {
      console.error('❌ Failed to request password reset:', error);
    },
  });
}

// Reset password
export function useResetPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ResetPasswordInput) => passwordService.resetPassword(data),
    onSuccess: () => {
      console.log('✅ Password reset successfully');
      // Clear any stored tokens after password reset
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
    onError: (error) => {
      console.error('❌ Failed to reset password:', error);
    },
  });
}
