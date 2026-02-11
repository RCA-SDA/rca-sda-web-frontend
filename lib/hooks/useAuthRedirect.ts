import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAuthenticated } from './useAuth';

interface RoleRedirectMap {
    [key: string]: string;
}

const ROLE_REDIRECTS: RoleRedirectMap = {
    'ELDER_FEMALE': '/users/elder_female',
    'ELDER_MALE': '/users/elder_male',
    'ASSISTANT_ELDER_FEMALE': '/users/assistant_elder_female',
    'ASSISTANT_ELDER_MALE': '/users/assistant_elder_male',
    'EVANGELISM_LEADER_FEMALE': '/users/evangelism_leader_female',
    'EVANGELISM_LEADER_MALE': '/users/evangelism_leader_male',
    'FATHER': '/users/father',
    'MOTHER': '/users/mother',
    'GRAND_FATHER': '/users/grand_father',
    'GRAND_MOTHER': '/users/grand_mother',
    'CHOIR_SECRETARY': '/users/choir_secretary',
    'CHURCH_SECRETARY': '/users/church_secretary',
    'ADMIN': '/',
};

export function useAuthRedirect() {
    const router = useRouter();
    const { isAuthenticated, user, isLoading } = useIsAuthenticated();

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;

        console.log('🔄 Auth redirect check:', {
            isLoading,
            isAuthenticated,
            user,
            currentPath: window.location.pathname,
            userRole: user?.role
        });

        if (!isLoading) {
            if (!isAuthenticated) {
                // Not authenticated - redirect to login (but not if already on login)
                if (window.location.pathname !== '/login') {
                    console.log('🔒 Redirecting to login');
                    router.push('/login');
                }
            } else if (user && user.role) {
                // Authenticated - redirect based on role
                const redirectPath = ROLE_REDIRECTS[user.role];
                console.log('🎯 Role redirect:', {
                    userRole: user.role,
                    redirectPath,
                    currentPath: window.location.pathname,
                    shouldRedirect: window.location.pathname === '/login' || window.location.pathname === '/'
                });

                if (redirectPath) {
                    // Only redirect if on login or home page
                    if (window.location.pathname === '/login' || window.location.pathname === '/') {
                        console.log('🚀 Redirecting to:', redirectPath);
                        router.push(redirectPath);
                    }
                    // Don't redirect from protected pages - this was causing the loop
                }
            }
        }
    }, [isAuthenticated, user, isLoading, router]);

    return { isAuthenticated, user, isLoading };
}

export function useProtectedRoute(requiredRole?: string) {
    const router = useRouter();
    const { isAuthenticated, user, isLoading } = useIsAuthenticated();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login');
                return;
            }

            if (requiredRole && user?.role !== requiredRole) {
                // User doesn't have required role - redirect to their dashboard
                const redirectPath = ROLE_REDIRECTS[user?.role || ''];
                if (redirectPath) {
                    router.push(redirectPath);
                }
            }
        }
    }, [isAuthenticated, user, isLoading, requiredRole, router]);

    return { isAuthenticated, user, isLoading, hasRequiredRole: user?.role === requiredRole };
}
