'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';


const VerifyEmailCompletePage: React.FC = () => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState<string>('Verifying your email...');
    const router = useRouter();
  
    useEffect(() => {
      const handleVerification = async () => {
        // Extract tokens from URL hash
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1)); // Remove '#'
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
  
        if (accessToken && refreshToken) {
          try {
            // Send tokens to your backend to set HTTP-only cookies
            const response = await apiClient.post('/api/auth/verify-email-complete', {
              accessToken,
              refreshToken,
            });
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
            setMessage(error.response?.data?.error || 'Failed to complete email verification.');
            setStatus('error');
          }
        } else {
          setMessage('No verification tokens found in URL. Please check your email again or try logging in.');
          setStatus('error');
        }
      };
  
      handleVerification();
    }, [router]);
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className=" max-w-lg bg-white p-8 rounded-lg shadow-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Email Verification</h2>
          {status === 'loading' && (
            <p className="text-blue-600 animate-pulse">{message}</p>
          )}
          {status === 'success' && (
            <p className="text-green-600">{message}</p>
          )}
          {status === 'error' && (
            <p className="text-red-600">{message}</p>
          )}
          {status !== 'loading' && (
            <p className="text-gray-600 text-sm mt-4">
              You will be redirected shortly. If not, please proceed to the <a href="/auth/login" className="text-blue-500 hover:underline">login page</a>.
            </p>
          )}
        </div>
      </div>
    );
  };
  
  export default VerifyEmailCompletePage;