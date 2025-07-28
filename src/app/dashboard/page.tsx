'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-background-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-heading-3 text-gradient-creative font-bold">
                Artifex Studio
              </Link>
              <div className="hidden md:flex items-center space-x-1">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('content')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'content' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Content
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'analytics' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Analytics
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-success-500"></div>
                    <div className="flex-1">
                      <p className="text-body-small">Blog post &quot;AI in Marketing&quot; published</p>
                      <p className="text-caption text-text-tertiary">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                    <div className="flex-1">
                      <p className="text-body-small">New draft &quot;Content Strategy Guide&quot; created</p>
                      <p className="text-caption text-text-tertiary">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
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
              <div className="space-y-4">
                {[
                  { title: "AI in Marketing: The Future is Here", status: "published", date: "2 hours ago", views: "156" },
                  { title: "Content Strategy Guide for 2024", status: "draft", date: "1 day ago", views: "0" },
                  { title: "10 Tips for Better Social Media Engagement", status: "published", date: "3 days ago", views: "89" },
                  { title: "How to Write Compelling Headlines", status: "published", date: "1 week ago", views: "234" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-background-secondary transition-colors">
                    <div className="flex-1">
                      <h4 className="text-body font-medium">{item.title}</h4>
                      <p className="text-caption text-text-tertiary">{item.date} • {item.views} views</p>
                    </div>
                    <div className="flex items-center space-x-3">
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
  );
} 