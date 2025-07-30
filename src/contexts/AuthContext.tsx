'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import apiClient from '@/utils/api';
import { User } from '@/models/User';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuthStatus = async () => {
    console.log('checkAuthStatus');
    try {
      const response = await apiClient.get('/api/me');
      console.log('Auth status check response:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Auth status check error:', error);
      setUser(null);
    } finally {
      console.log('Auth status check finally');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    // setError('');
    try {
      // 1. Call your Express.js backend to initiate the Google OAuth flow
      // The `redirectTo` URL is where Supabase will send the user back after Google auth.
      // This MUST be a URL on your Next.js frontend that can handle the OAuth callback.
      const redirectFrontendUrl = `${window.location.origin}/auth/google`; // Dynamically get your frontend origin
      console.log('redirectFrontendUrl', redirectFrontendUrl);
      const response = await apiClient.post('/auth/oauth/google-initiate', {
        redirectTo: redirectFrontendUrl,
      });

      const oauthRedirectUrl = response.data.oauth_redirect_url;

      if (oauthRedirectUrl) {
        // 2. Redirect the user's browser to the Google OAuth URL provided by your backend
        // This is a full page redirect, as required by OAuth.
        window.location.href = oauthRedirectUrl;
      } else {
        console.log('Failed to get Google OAuth redirect URL from backend.');
      }
    } catch (err: unknown) {
      console.log(
        err && typeof err === 'object' && 'response' in err &&
          err.response && typeof err.response === 'object' && 'data' in err.response &&
          err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data
          ? String(err.response.data.message)
          : 'Google login initiation failed.'
      );
    } finally {
      setLoading(false); // Note: This might not run if window.location.href takes over immediately
    }
  };

  const handleRouteProtection = () => {
    // Public routes that don't require authentication
    const publicRoutes = ['/', '/auth/login', '/auth/signup', '/auth/check-email', '/auth/verify-email-complete'];
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthenticated = !!user;

    console.log('handleRouteProtection isAuthenticated:', isAuthenticated);
    console.log('handleRouteProtection isPublicRoute:', isPublicRoute);

    if (isAuthenticated && isPublicRoute) {
      // User is logged in but on a public route, redirect to dashboard
      router.push('/dashboard');
    } else if (!isAuthenticated && !isPublicRoute) {
      // User is not logged in but trying to access a protected route (including non-existent routes), redirect to landing page
      router.push('/');
    } else if (isAuthenticated && !isPublicRoute) {
      // User is authenticated but on a non-existent route, redirect to dashboard
      router.push('/dashboard');
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Handle route protection - triggers on user state changes
  useEffect(() => {
    if (!loading) {
      handleRouteProtection();
    }
  }, [loading, user, pathname, router]);

  // Show loading spinner while authentication is being checked
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

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/api/auth/logout');
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      setUser(null);
      router.push('/');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await apiClient.post('/api/auth/signup', { email, password, name });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    signup,
    handleGoogleLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 