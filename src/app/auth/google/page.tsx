'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/utils/api';
import { logLogin } from '@/utils/logger';

export default function AuthCallbackPage() {
    const [message, setMessage] = useState('Processing your login...');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            logLogin({
                message: 'On Google Callback Page (Trying to get tokens from following url location)',
                details: {
                    "window.location.hash": window.location.hash,
                    "window.location.hash.substring(1)": window.location.hash.substring(1),
                }
            })
            // 1. Extract tokens from URL hash
            console.log('handleOAuthCallback');
            console.log('window.location.hash', window.location.hash);
            console.log('window.location.hash.substring(1)', window.location.hash.substring(1));
            const hash = window.location.hash.substring(1); // Remove the '#'
            const params = new URLSearchParams(hash);
            const accessToken = params.get('access_token');
            const refreshToken = params.get('refresh_token');

            // Clear the hash from the URL so it's not visible
            // This is important for a cleaner URL and security.
            if (window.history.replaceState) {
                window.history.replaceState(null, '', window.location.pathname);
            }

            if (!accessToken || !refreshToken) {
                setError('Login failed: Missing tokens from provider.');
                setMessage('Redirecting to login page...');
                logLogin({
                    message: 'On Google Callback Page2 (going to login)',
                    details: {
                        'calling back accessToken': accessToken,
                        'calling back refreshToken': refreshToken
                    }
                })
                setTimeout(() => router.push('/auth/login'), 3000); // Redirect after a delay
                return;
            }

            try {
                // 2. Send tokens to your Express.js backend to finalize the session
                // Your backend will set HTTP-only cookies.
                logLogin({
                    message: 'On Google Callback Page2 (Calling back to backend with tokens)',
                    details: {
                        'calling back accessToken': accessToken,
                        'calling back refreshToken': refreshToken
                    }
                })
                console.log('calling back accessToken', accessToken);
                console.log('calling back refreshToken', refreshToken);
                await apiClient.post('/api/auth/google/callback', {
                    accessToken,
                    refreshToken,
                });

                // 3. Upon success, redirect to the dashboard
                setMessage('Login successful! Redirecting...');
                logLogin({
                    message: 'On Google Callback Page2 (going to dashboard)',
                    details: {
                        'calling back accessToken': accessToken,
                        'calling back refreshToken': refreshToken
                    }
                })
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
                        'calling back accessToken': accessToken,
                        'calling back refreshToken': refreshToken
                    }
                })
                setTimeout(() => router.push('/login'), 3000); // Redirect after a delay
            }
        };

        handleOAuthCallback();
    }, [router]); // Re-run effect if router object changes (unlikely, but good practice)

    return (
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
    );
}