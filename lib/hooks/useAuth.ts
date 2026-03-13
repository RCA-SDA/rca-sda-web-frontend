import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, type LoginInput, type RegisterInput, type User } from '@/lib/services/auth.service';
import { getUserFromToken } from '@/lib/utils/jwt';
import { getRoleRedirectPath } from '@/lib/utils/roleRedirect';

// Login mutation
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginInput) => {
            console.log('🔍 Login attempt:', data);
            console.log('🌐 API URL:', process.env.NEXT_PUBLIC_API_URL);
            return authService.login(data);
        },
        onSuccess: (data) => {
            console.log('✅ Login success:', data);
            // Store tokens in localStorage
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });

            // Role-based redirect after successful login
            setTimeout(() => {
                // Debug: Check the raw token
                const rawToken = localStorage.getItem('access_token');
                console.log('🔑 Raw access token:', rawToken);

                // Get user from token to determine role
                const user = getUserFromToken();
                console.log('👤 Full user data from token:', user);
                console.log('👤 User role:', user?.role);
                console.log('👤 User authorities:', user?.authorities);
                console.log('👤 User role type:', typeof user?.role);
                console.log('👤 All user properties:', user ? Object.keys(user) : 'No user data');

                // Extract role from authorities if no direct role property
                let userRole = user?.role;
                if (!userRole && user?.authorities && Array.isArray(user.authorities)) {
                    // Look for role in authorities array
                    const roleAuthority = user.authorities.find((auth: string) =>
                        auth.includes('ROLE_') && auth !== 'ROLE_USER'
                    );
                    if (roleAuthority) {
                        userRole = roleAuthority.replace('ROLE_', '');
                    }
                }

                console.log('🎯 Final user role for redirect:', userRole);

                // Get redirect path based on role
                const redirectPath = getRoleRedirectPath(userRole || 'USER');
                console.log('🔄 Redirecting to:', redirectPath);

                window.location.href = redirectPath;
            }, 1000);
        },
        onError: (error) => {
            console.error('❌ Login failed:', error);
            console.error('❌ Error details:', {
                message: error.message,
                status: (error as any).status,
                data: (error as any).data
            });
        },
    });
}

// Register mutation
export function useRegister() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RegisterInput) => authService.register(data),
        onSuccess: (data) => {
            // Store tokens in localStorage
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        },
    });
}

// Logout mutation
export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            // Clear tokens from localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            // Clear all queries
            queryClient.clear();
        },
        onError: (error) => {
            console.error('Logout failed:', error);
            // Still clear local data even if logout request fails
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            queryClient.clear();
        },
    });
}

// Get current user query
export function useCurrentUser() {
    return useQuery({
        queryKey: ['auth', 'user'],
        queryFn: () => {
            // Get user from JWT token instead of API call
            const tokenUser = getUserFromToken();
            console.log('👤 useCurrentUser - user from token:', tokenUser);

            // Transform the JWT payload to match User interface
            let user = null;
            if (tokenUser) {
                // Extract role from authorities if no direct role property
                let role = tokenUser.role;
                if (!role && tokenUser.authorities && Array.isArray(tokenUser.authorities)) {
                    // Look for role in authorities array
                    const roleAuthority = tokenUser.authorities.find((auth: string) =>
                        auth.includes('ROLE_') && auth !== 'ROLE_USER'
                    );
                    if (roleAuthority) {
                        role = roleAuthority.replace('ROLE_', '');
                    }
                }

                user = {
                    id: tokenUser.sub || tokenUser.email,
                    email: tokenUser.sub || tokenUser.email,
                    name: tokenUser.name || tokenUser.sub || tokenUser.email,
                    role: role || 'USER'
                };
            }

            console.log('👤 Transformed user object:', user);
            return { user };
        },
        enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'), // Only run if token exists and in browser
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        select: (data) => data.user, // Extract user from response
    });
}

// Forgot password mutation
export function useForgotPassword() {
    return useMutation({
        mutationFn: (email: string) => authService.forgotPassword(email),
        onSuccess: () => {
            console.log('Password reset email sent');
        },
        onError: (error) => {
            console.error('Failed to send password reset email:', error);
        },
    });
}

// Reset password mutation
export function useResetPassword() {
    return useMutation({
        mutationFn: ({ token, password }: { token: string; password: string }) =>
            authService.resetPassword(token, password),
        onSuccess: () => {
            console.log('Password reset successful');
        },
        onError: (error) => {
            console.error('Password reset failed:', error);
        },
    });
}

// Check if user is authenticated
export function useIsAuthenticated() {
    const { data: user, isLoading, error } = useCurrentUser();

    console.log('🔍 Auth check:', {
        user,
        isLoading,
        error,
        isAuthenticated: !!user && !error
    });

    return {
        isAuthenticated: !!user && !error,
        isLoading,
        user,
    };
}
