'use client';

import { useProtectedRoute } from '@/lib/hooks/useAuthRedirect';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  fallback = <div>Loading...</div>
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRequiredRole } = useProtectedRoute(requiredRole);

  if (isLoading) {
    return fallback;
  }

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  if (requiredRole && !hasRequiredRole) {
    return <div>You don't have permission to access this page.</div>;
  }

  return <>{children}</>;
}
