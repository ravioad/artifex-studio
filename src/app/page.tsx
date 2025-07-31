'use client';

import Link from 'next/link';
import PageWrapper from '@/components/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-heading-3 text-gradient-creative font-bold">
                  Artifex Studio
                </h1>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="#features" className="text-body text-text-secondary hover:text-text-primary transition-colors">
                  Features
                </Link>
                <Link href="#pricing" className="text-body text-text-secondary hover:text-text-primary transition-colors">
                  Pricing
                </Link>
                <Link href="#about" className="text-body text-text-secondary hover:text-text-primary transition-colors">
                  About
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/auth/login" className="btn-ghost">Sign In</Link>
                <Link href="/auth/signup" className="btn-primary">Get Started</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-display-1 mb-6 text-gradient-creative">
                AI-Powered Content Creation Studio
              </h1>
              <p className="text-body-large text-text-secondary mb-8 max-w-4xl mx-auto">
                Transform your content creation with cutting-edge AI. Generate, edit, and publish
                compelling text content that engages your audience and drives results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4">
                  Start Creating Now
                </Link>
                <Link href="/dashboard" className="btn-secondary text-lg px-8 py-4">
                  View Dashboard
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="gradient-creative rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 overflow-hidden">
                <div className="glass rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent-emerald"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent-amber"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent-rose"></div>
                    </div>
                    <span className="text-caption text-text-inverse text-xs sm:text-sm">AI Content Editor</span>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="h-5 sm:h-6 flex items-center overflow-hidden">
                      <div className="text-white text-xs sm:text-sm font-mono overflow-hidden">
                        <span className="typing-line-1">Creating AI blog post...</span>
                      </div>
                    </div>
                    <div className="h-5 sm:h-6 flex items-center overflow-hidden">
                      <div className="text-white text-xs sm:text-sm font-mono opacity-75 overflow-hidden">
                        <span className="typing-line-2">Generating marketing copy...</span>
                      </div>
                    </div>
                    <div className="h-5 sm:h-6 flex items-center overflow-hidden">
                      <div className="text-white text-xs sm:text-sm font-mono opacity-50 overflow-hidden">
                        <span className="typing-line-3">Optimizing for SEO...</span>
                      </div>
                    </div>
                    <div className="h-5 sm:h-6 flex items-center overflow-hidden">
                      <div className="text-white text-xs sm:text-sm font-mono opacity-25 overflow-hidden">
                        <span className="typing-line-4">Analyzing performance...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-white mb-4">
                Powerful Features for Content Creators
              </h2>
              <p className="text-lg text-slate-300 max-w-5xl mx-auto">
                Everything you need to create, manage, and publish exceptional content with AI assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="card-elevated group">
                <div className="gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-heading-3 mb-3">AI-Powered Generation</h3>
                <p className="text-body-small text-text-secondary">
                  Generate high-quality content in seconds with advanced AI models.
                  From blog posts to marketing copy, create compelling text that resonates.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card-elevated group">
                <div className="gradient-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-heading-3 mb-3">Smart Editing</h3>
                <p className="text-body-small text-text-secondary">
                  Intelligent editing tools that suggest improvements, fix grammar,
                  and enhance readability while maintaining your unique voice.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card-elevated group">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--accent-emerald)' }}>
                  <svg className="w-6 h-6 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-heading-3 mb-3">Content Management</h3>
                <p className="text-body-small text-text-secondary">
                  Organize, categorize, and manage all your content in one place.
                  Track versions, collaborate with teams, and maintain consistency.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="card-elevated group">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--accent-amber)' }}>
                  <svg className="w-6 h-6 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <h3 className="text-heading-3 mb-3">Multi-Platform Publishing</h3>
                <p className="text-body-small text-text-secondary">
                  Publish directly to your favorite platforms. From social media
                  to blogs, reach your audience wherever they are.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="card-elevated group">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--accent-rose)' }}>
                  <svg className="w-6 h-6 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-heading-3 mb-3">Analytics & Insights</h3>
                <p className="text-body-small text-text-secondary">
                  Track performance, understand your audience, and optimize your
                  content strategy with detailed analytics and AI-powered insights.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="card-elevated group">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--accent-cyan)' }}>
                  <svg className="w-6 h-6 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-heading-3 mb-3">Enterprise Security</h3>
                <p className="text-body-small text-text-secondary">
                  Bank-level security with end-to-end encryption, role-based access,
                  and compliance with industry standards to protect your content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-heading-1 mb-6">Ready to Transform Your Content Creation?</h2>
            <p className="text-body-large text-text-secondary mb-8">
              Join thousands of content creators who are already using AI to create
              better content faster. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4">
                Start Free Trial
              </Link>
              <Link href="/dashboard" className="btn-ghost text-lg px-8 py-4">
                View Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background-secondary border-t border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h3 className="text-heading-3 text-gradient-creative font-bold mb-4">Artifex Studio</h3>
              <p className="footer-description">
                Empowering content creators with AI-powered tools for the modern digital landscape.
              </p>
              <div className="mb-8" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
                <Link href="/terms" className="text-body-small text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-body-small text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap">
                  Privacy Policy
                </Link>
              </div>
            </div>
            <div className="border-t border-border pt-8 text-center">
              <p className="text-body-small text-text-tertiary">
                © 2024 Artifex Studio. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PageWrapper>
  );
}
