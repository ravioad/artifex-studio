'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { navigationTracker } from '@/utils/logger';

interface NavigationTrackerProps {
  screenName?: string;
}

export default function NavigationTracker({ screenName }: NavigationTrackerProps) {
  const pathname = usePathname();
  const { loading, isAuthenticated } = useAuth(screenName);

  useEffect(() => {
    const authState = loading 
      ? 'loading' as const 
      : isAuthenticated 
        ? 'authenticated' as const 
        : 'unauthenticated' as const;

    navigationTracker.trackNavigation(
      pathname,
      authState,
      'route_change',
      {
        screenName,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
        referrer: typeof window !== 'undefined' ? document.referrer : '',
        timestamp: new Date().toISOString(),
      }
    );
  }, [pathname, loading, isAuthenticated, screenName]);

  // Track initial load
  useEffect(() => {
    const authState = loading 
      ? 'loading' as const 
      : isAuthenticated 
        ? 'authenticated' as const 
        : 'unauthenticated' as const;

    navigationTracker.trackNavigation(
      pathname,
      authState,
      'initial_load',
      {
        screenName,
        isInitialLoad: true,
        timestamp: new Date().toISOString(),
      }
    );
  }, []); // Only run once on mount

  // Track auth state changes
  useEffect(() => {
    if (!loading) { // Only track after initial loading is complete
      const authState = isAuthenticated ? 'authenticated' as const : 'unauthenticated' as const;
      
      navigationTracker.trackNavigation(
        pathname,
        authState,
        'auth_change',
        {
          screenName,
          authStateChanged: true,
          timestamp: new Date().toISOString(),
        }
      );
    }
  }, [loading, isAuthenticated, pathname, screenName]);

  return null; // This component doesn't render anything
} 