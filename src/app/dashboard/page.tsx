'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import PageWrapper from '@/components/PageWrapper';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth('dashboard');

  // Check if user is authorized (replace with your email)
  const isAuthorized = user?.email === 'rvoad9@gmail.com'; // Replace with your actual email

  // Show work in progress for unauthorized users
  if (!isAuthorized) {
    return (
      <PageWrapper>

        <div className="min-h-screen bg-background">
          {/* Top Navigation */}
          <nav className="bg-background-card border-b border-border">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <Link href="/" className="text-heading-3 text-gradient-creative font-bold">
                    Artifex Studio
                  </Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ position: 'relative' }} onMouseEnter={(e) => {
                    const dropdown = e.currentTarget.querySelector('[data-dropdown]') as HTMLElement;
                    if (dropdown) {
                      dropdown.style.opacity = '1';
                      dropdown.style.visibility = 'visible';
                    }
                  }} onMouseLeave={(e) => {
                    const dropdown = e.currentTarget.querySelector('[data-dropdown]') as HTMLElement;
                    if (dropdown) {
                      dropdown.style.opacity = '0';
                      dropdown.style.visibility = 'hidden';
                    }
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0ea5e9, #a855f7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                    }}>
                      <svg style={{ width: '20px', height: '20px', color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div data-dropdown style={{
                      position: 'absolute',
                      right: '0',
                      top: '100%',
                      marginTop: '0.5rem',
                      width: '200px',
                      backgroundColor: 'rgba(30, 41, 59, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                      opacity: '0',
                      visibility: 'hidden',
                      transition: 'all 0.2s ease',
                      zIndex: '50'
                    }}>
                      <div style={{ padding: '0.5rem 0' }}>
                        <div style={{ padding: '0.75rem 1rem', fontSize: '14px', color: '#94a3b8', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          {user?.email}
                        </div>
                        <button
                          onClick={logout}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            fontSize: '14px',
                            color: '#f8fafc',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Work in Progress Content */}
          <div className="w-full max-w-7sxl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">Work in Progress</h1>
                <p className="text-xl text-slate-300 mb-8">
                  We&apos;re currently building something amazing for you!
                </p>
              </div>

              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                maxWidth: '42rem',
                margin: '0 auto',
                width: '100%'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffffff', marginBottom: '1rem' }}>Coming Soon</h2>
                <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Our AI-powered content creation studio is under development.
                  You&apos;ll be the first to know when it&apos;s ready!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}></div>
                    <span style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '500' }}>AI-powered content generation</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#a855f7', boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }}></div>
                    <span style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '500' }}>Smart editing and optimization</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}></div>
                    <span style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '500' }}>Multi-platform publishing</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b', boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)' }}></div>
                    <span style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '500' }}>Advanced analytics and insights</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>

      <div className="min-h-screen bg-background">
        {/* Top Navigation */}
        <nav className="bg-background-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link href="/" className="text-heading-3 text-gradient-creative font-bold">
                  Artifex Studio
                </Link>
                <div className="hidden md:flex items-center" style={{ gap: '0.25rem' }}>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'content'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    Content
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'analytics'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    Settings
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button className="btn-ghost">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </button>
                <div className="relative group">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center cursor-pointer">
                    <span className="text-text-inverse text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-background-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-text-secondary border-b border-border">
                        {user?.email}
                      </div>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-secondary transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="card">
                <h1 className="text-heading-1 mb-2">Welcome back, {user?.name || 'User'}!</h1>
                <p className="text-body text-text-secondary">
                  Ready to create some amazing content today? Here&apos;s what&apos;s happening with your projects.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-caption text-text-tertiary">Total Content</p>
                      <p className="text-heading-2">24</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-caption text-text-tertiary">Published</p>
                      <p className="text-heading-2">18</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-success-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-caption text-text-tertiary">Drafts</p>
                      <p className="text-heading-2">6</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-warning-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-caption text-text-tertiary">Views</p>
                      <p className="text-heading-2">2.4k</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-info-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-info-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-heading-3 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link href="/editor" className="w-full btn-primary text-left">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create New Content
                    </Link>
                    <button className="w-full btn-secondary text-left">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate with AI
                    </button>
                    <button className="w-full btn-ghost text-left">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Publish Content
                    </button>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-heading-3 mb-4">Recent Activity</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="w-2 h-2 rounded-full bg-success-500"></div>
                      <div className="flex-1">
                        <p className="text-body-small">Blog post &quot;AI in Marketing&quot; published</p>
                        <p className="text-caption text-text-tertiary">2 hours ago</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                      <div className="flex-1">
                        <p className="text-body-small">New draft &quot;Content Strategy Guide&quot; created</p>
                        <p className="text-caption text-text-tertiary">1 day ago</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div className="w-2 h-2 rounded-full bg-warning-500"></div>
                      <div className="flex-1">
                        <p className="text-body-small">Social media post scheduled</p>
                        <p className="text-caption text-text-tertiary">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Content */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-heading-3">Recent Content</h3>
                  <button className="btn-ghost text-sm">View All</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { title: "AI in Marketing: The Future is Here", status: "published", date: "2 hours ago", views: "156" },
                    { title: "Content Strategy Guide for 2024", status: "draft", date: "1 day ago", views: "0" },
                    { title: "10 Tips for Better Social Media Engagement", status: "published", date: "3 days ago", views: "89" },
                    { title: "How to Write Compelling Headlines", status: "published", date: "1 week ago", views: "234" }
                  ].map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-primary)', transition: 'background-color 0.2s' }} className="hover:bg-background-secondary">
                      <div className="flex-1">
                        <h4 className="text-body font-medium">{item.title}</h4>
                        <p className="text-caption text-text-tertiary">{item.date} • {item.views} views</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span className={`badge ${item.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                          {item.status}
                        </span>
                        <button className="btn-ghost text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-heading-1">Content Library</h1>
                <button className="btn-primary">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Content
                </button>
              </div>

              <div className="card">
                <p className="text-body text-text-secondary">Content management interface coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <h1 className="text-heading-1">Analytics</h1>
              <div className="card">
                <p className="text-body text-text-secondary">Analytics dashboard coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h1 className="text-heading-1">Settings</h1>
              <div className="card">
                <p className="text-body text-text-secondary">Settings panel coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>

  );
} 