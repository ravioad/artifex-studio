'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function NotFound() {
  const { loading } = useAuth();

  // Show loading spinner while authentication is being checked
  // This prevents the 404 page from showing before route protection redirects
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background animate-fade-in">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-text-secondary animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  // If we reach here, it means loading is false but route protection hasn't redirected yet
  // Show a minimal loading state to prevent any flash of 404 content
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-2"></div>
        <p className="text-text-secondary text-sm">Redirecting...</p>
      </div>
    </div>
  );
} 