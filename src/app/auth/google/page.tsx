'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';
import { logLogin, navigationTracker } from '@/utils/logger';
import { useAuth } from '@/contexts/AuthContext';
import PageWrapper from '@/components/PageWrapper';
import NavigationTracker from '@/components/NavigationTracker';

export default function AuthCallbackPage() {
    const [message, setMessage] = useState('Processing your login...');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { loading: authLoading, refreshAuth } = useAuth('google');

    useEffect(() => {
        const handleOAuthCallback = async () => {
            logLogin({
                message: 'On Google Callback Page (Trying to get tokens from following url location)',
                details: {
                    "window.location.hash": window.location.hash,
                    "window.location.hash.substring(1)": window.location.hash.substring(1),
                }
            })
            const hash = window.location.hash.substring(1); // Remove the '#'
            const params = new URLSearchParams(hash);
            const access_token = params.get('access_token');
            const refresh_token = params.get('refresh_token');

            // Clear the hash from the URL so it's not visible
            // This is important for a cleaner URL and security.
            if (window.history.replaceState) {
                window.history.replaceState(null, '', window.location.pathname);
            }

            if (!access_token || !refresh_token) {
                setError('Login failed: Missing tokens from provider.');
                setMessage('Redirecting to login page...');
                logLogin({
                    message: 'On Google Callback Page2 (going to login)',
                    details: {
                        'calling back access_token': access_token,
                        'calling back refresh_token': refresh_token
                    }
                })
                setTimeout(() => router.push('/auth/login'), 3000);
                return;
            }

            try {
                logLogin({
                    message: 'On Google Callback Page2 (Calling back to backend with tokens)',
                    details: {
                        'calling back access_token': access_token,
                        'calling back refresh_token': refresh_token
                    }
                })
                console.log('calling back access_token', access_token);
                console.log('calling back refresh_token', refresh_token);
                await apiClient.post('/api/auth/google/callback', {
                    access_token,
                    refresh_token,
                });

                setMessage('Login successful! Redirecting...');
                logLogin({
                    message: 'On Google Callback Page2 (going to dashboard)',
                    details: {
                        'calling back access_token': access_token,
                        'calling back refresh_token': refresh_token
                    }
                })

                await refreshAuth();

                // Track the successful OAuth completion
                navigationTracker.trackNavigation(
                    '/dashboard',
                    'authenticated',
                    'redirect',
                    {
                        fromPath: '/auth/google',
                        redirectReason: 'google_oauth_success',
                        oauthProvider: 'google'
                    }
                );

                // Immediate redirect to prevent showing landing page
                router.push('/dashboard');
            } catch (err: unknown) {
                console.error('OAuth Callback Error:', err);
                setError(
                    err && typeof err === 'object' && 'response' in err &&
                        err.response && typeof err.response === 'object' && 'data' in err.response &&
                        err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data
                        ? String(err.response.data.message)
                        : 'Login failed. Please try again.'
                );
                setMessage('Redirecting to login page...');
                logLogin({
                    message: 'On Google Callback Page2 (going to login on error)',
                    details: {
                        'calling back access_token': access_token,
                        'calling back refresh_token': refresh_token
                    }
                })
                setTimeout(() => router.push('/auth/login'), 3000);
            }
        };

        handleOAuthCallback();
    }, [router]);

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
            <NavigationTracker screenName="google-oauth-callback" />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#1a1a2e', // Example dark background
                color: '#ffffff', // Example light text
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    backgroundColor: '#2e2e42',
                    padding: '40px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center'
                }}>
                    {error ? (
                        <>
                            <h2 style={{ color: '#ff6b6b' }}>Error!</h2>
                            <p>{error}</p>
                        </>
                    ) : (
                        <>
                            <h2 style={{ color: '#6bff6b' }}>{message}</h2>
                            {/* Simple loading spinner or icon */}
                            <div style={{
                                border: '4px solid rgba(255, 255, 255, 0.3)',
                                borderTop: '4px solid #6bff6b',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                animation: 'spin 1s linear infinite',
                                margin: '20px auto'
                            }}></div>
                            <style jsx>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
                        </>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
}