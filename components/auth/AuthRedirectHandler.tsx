'use client';

import { useAuthRedirect } from '@/lib/hooks/useAuthRedirect';

export default function AuthRedirectHandler() {
  // Only run redirect logic on client side
  if (typeof window === 'undefined') {
    return null;
  }

  useAuthRedirect();

  // This component doesn't render anything
  // It just handles the authentication redirects
  return null;
}
