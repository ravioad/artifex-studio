'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import PageWrapper from '@/components/PageWrapper';

export default function ResetPassword() {
    const { loading, resetPassword } = useAuth();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        // Supabase provides both access_token and refresh_token in URL parameters
        // const accessTokenParam = searchParams.get('access_token');
        // const refreshTokenParam = searchParams.get('refresh_token');
        const hash = window.location.hash.substring(1); // Remove the '#'
        console.log('hash', hash);
        const params = new URLSearchParams(hash);
        const accessTokenParam = params.get('access_token');
        const refreshTokenParam = params.get('refresh_token');
        console.log('accessTokenParam', accessTokenParam);
        console.log('refreshTokenParam', refreshTokenParam);    
        setAccessToken(accessTokenParam);
        setRefreshToken(refreshTokenParam);

        if (!accessTokenParam || !refreshTokenParam) {
            setError('Invalid or missing authentication tokens. Please request a new password reset.');
        }
    }, [searchParams]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        // Validate password strength
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setIsLoading(false);
            return;
        }

        try {
            // Pass both tokens to the reset password function
            await resetPassword(accessToken!, refreshToken!, formData.password);
            setSuccess(true);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: string } }; message?: string };
            setError(error.response?.data?.error || error.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!accessToken || !refreshToken) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block text-3xl text-gradient-creative font-bold mb-6">
                            Artifex Studio
                        </Link>
                        <h1 className="text-4xl font-bold text-white mb-3">Invalid Reset Link</h1>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            This password reset link is invalid or has expired.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                            {error}
                        </div>
                        <div className="text-center space-y-6">
                            <Link
                                href="/auth/forgot-password"
                                className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Request new reset link
                            </Link>
                            <Link
                                href="/auth/login"
                                className="inline-block w-full bg-white/10 border border-white/20 text-white font-medium py-3 px-4 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200"
                            >
                                Back to login
                            </Link>
                        </div>
                    </div>
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
                        <Link href="/" className="inline-block text-3xl text-gradient-creative font-bold mb-6">
                            Artifex Studio
                        </Link>
                        <h1 className="text-4xl font-bold text-white mb-3">Set new password</h1>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            Enter your new password below
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        {error && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        {success ? (
                            <div className="text-center space-y-6">
                                <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm">
                                    Password successfully reset! You can now sign in with your new password.
                                </div>
                                <Link
                                    href="/auth/login"
                                    className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Sign in
                                </Link>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* New Password Field */}
                                <div className="space-y-3">
                                    <label htmlFor="password" className="text-sm font-medium text-white">
                                        New password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your new password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <p className="text-xs text-slate-400">Password must be at least 8 characters long</p>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="space-y-3">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                                        Confirm new password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Confirm your new password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                </div>

                                {/* Reset Password Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 flex justify-center items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Resetting...
                                        </>
                                    ) : (
                                        'Reset password'
                                    )}
                                </button>

                                {/* Back to Login Link */}
                                <div className="text-center pt-4">
                                    <p className="text-sm text-slate-300">
                                        Remember your password?{' '}
                                        <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                            Back to login
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-xs text-slate-400">
                            Need help?{' '}
                            <Link href="/support" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Contact support
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
} 