'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const CheckEmailPage: React.FC = () => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
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

  // Redirect authenticated users to dashboard
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background animate-fade-in">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-text-secondary animate-pulse">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background-primary)' }}>
      <div className="w-full max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl text-gradient-creative font-bold mb-6">
            Artifex Studio
          </Link>
          <h1 className="text-heading-1 mb-3">Check Your Email</h1>
          <p className="text-body-large text-text-secondary">
            We&apos;ve sent you a verification link to complete your registration
          </p>
        </div>

        {/* Main Card */}
        <div className="card-elevated">
          {/* Email Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <h2 className="text-heading-2">Verification Email Sent</h2>
            <p className="text-body text-text-secondary">
              We&apos;ve sent a verification link to your email address. Click the link to confirm your account and start creating amazing content.
            </p>

            {/* Spam Folder Note */}
            <div className="bg-background-secondary border border-border rounded-lg p-4 mt-6">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-warning-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-body-small text-text-secondary">
                  Don&apos;t see the email? Check your spam folder or try refreshing your inbox.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 text-center">
            <Link href="/auth/login" className="text-primary-500 hover:text-primary-400 font-medium transition-colors">
              Back to Sign In
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-caption text-text-tertiary">
            Need help? <Link href="/support" className="text-primary-500 hover:text-primary-400 transition-colors">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckEmailPage;