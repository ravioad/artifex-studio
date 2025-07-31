'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';
import { useAuth } from '@/contexts/AuthContext';
import PageWrapper from '@/components/PageWrapper';
import { logErrorFrontend } from '@/utils/logger';


const VerifyEmailCompletePage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('Verifying your email...');
  const router = useRouter();
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    const handleVerification = async () => {
      // Extract tokens from URL hash
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1)); // Remove '#'
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (accessToken && refreshToken) {
        try {
          logErrorFrontend({
            accessToken,
            refreshToken,
          }, 'Verification completion started');
          // Send tokens to your backend to set HTTP-only cookies
          const response = await apiClient.post('/api/auth/verify-email-complete', {
            accessToken,
            refreshToken,
          });
          logErrorFrontend({
            "response": response.data.message || 'Email verification successful!'
          }, 'Verification completion successful');
          setMessage(response.data.message || 'Email verification successful!');
          setStatus('success');
          // Clear the URL hash for cleaner UX
          window.history.replaceState({}, document.title, window.location.pathname);
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push('/dashboard'); // Or your main app page
          }, 2000);
        } catch (err: unknown) {
          const error = err as { response?: { data?: { error?: string } }; message?: string };
          console.error('Verification completion error:', error.response?.data || error.message);

          logErrorFrontend({
            "response": error.response?.data || error.message || 'Failed to complete email verification.'
          }, 'Verification completion catch error');
          setMessage(error.response?.data?.error || 'Failed to complete email verification.');
          setStatus('error');
        }
      } else {
        logErrorFrontend({
          "response": 'No verification tokens found in URL. Please check your email again or try logging in.'
        }, 'Verification completion error');
        setMessage('No verification tokens found in URL. Please check your email again or try logging in.');
        setStatus('error');
      }
    };

    handleVerification();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background animate-fade-in">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-text-secondary animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">Email Verification</h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Completing your account verification
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center mb-6">
              {status === 'loading' && (
                <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                </div>
              )}
              {status === 'success' && (
                <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              {status === 'error' && (
                <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            <div className="text-center space-y-4">
              {status === 'loading' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Verifying Your Email</h2>
                  <p className="text-slate-300 animate-pulse">{message}</p>
                </div>
              )}
              {status === 'success' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Verification Successful!</h2>
                  <p className="text-slate-300">{message}</p>
                </div>
              )}
              {status === 'error' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Verification Failed</h2>
                  <p className="text-slate-300">{message}</p>
                </div>
              )}

              {/* Action Links */}
              {status !== 'loading' && (
                <div className="pt-4">
                  <p className="text-sm text-slate-400 mb-4">
                    {status === 'success'
                      ? 'You will be redirected to your dashboard shortly.'
                      : 'Please try again or contact support if the problem persists.'
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="/auth/login"
                      className="bg-white/10 border border-white/20 text-white font-medium py-2 px-4 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200"
                    >
                      Go to Login
                    </a>
                    {status === 'error' && (
                      <a
                        href="/auth/signup"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200"
                      >
                        Try Again
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-slate-400">
              Need help? <a href="/support" className="text-blue-400 hover:text-blue-300 transition-colors">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default VerifyEmailCompletePage;