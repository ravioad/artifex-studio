'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import AnimatedFormField from '@/components/AnimatedFormField';
import AnimatedButton from '@/components/AnimatedButton';
import PageWrapper from '@/components/PageWrapper';

export default function ForgotPassword() {
    const { loading, forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

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
        setSuccess(false);

        try {
            await forgotPassword(email);
            setSuccess(true);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: string } }; message?: string };
            setError(error.response?.data?.error || error.message || 'Failed to send reset email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrapper>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
                <div className="w-full max-w-lg">
                {/* Header */}
                <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <Link href="/" className="inline-block text-3xl text-gradient-creative font-bold mb-6">
                        Artifex Studio
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-3">Reset your password</h1>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        Enter your email address and we&apos;ll send you a link to reset your password
                    </p>
                </motion.div>
&apos;
                                {/* Main Card */}
                <motion.div 
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                >
                    {error && (
                        <motion.div 
                            className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {error}
                        </motion.div>
                    )}
                    
                    {success ? (
                        <motion.div 
                            className="text-center space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div 
                                className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                Password reset email sent! Check your inbox for instructions.
                            </motion.div>
                            <p className="text-slate-300">
                                Didn&apos;t receive the email? Check your spam folder or{' '}
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    try again
                                </button>
                            </p>
                            <AnimatedButton variant="primary">
                                <Link href="/auth/login" className="w-full h-full flex items-center justify-center">
                                    Back to login
                                </Link>
                            </AnimatedButton>
                        </motion.div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <AnimatedFormField index={0}>
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-sm font-medium text-white">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </AnimatedFormField>

                            {/* Send Reset Email Button */}
                            <AnimatedFormField index={1}>
                                <AnimatedButton 
                                    type="submit" 
                                    loading={isLoading}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Sending...' : 'Send reset email'}
                                </AnimatedButton>
                            </AnimatedFormField>

                            {/* Back to Login Link */}
                            <AnimatedFormField index={2}>
                                <div className="text-center pt-4">
                                    <p className="text-sm text-slate-300">
                                        Remember your password?{' '}
                                        <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                            Back to login
                                        </Link>
                                    </p>
                                </div>
                            </AnimatedFormField>
                        </form>
                    )}
                </motion.div>

                {/* Footer */}
                <motion.div 
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="text-xs text-slate-400">
                        Need help?{' '}
                        <Link href="/support" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Contact support
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
        </PageWrapper>
    );
} 