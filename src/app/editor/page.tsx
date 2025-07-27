'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContentEditor() {
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState('blog-post');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = `# ${prompt}

This is a sample AI-generated content based on your prompt: "${prompt}"

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Key Points

- **Point 1**: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
- **Point 2**: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
- **Point 3**: Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

## Conclusion

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

---

*This content was generated using AI technology to help you create engaging and informative articles faster.*`;

      setContent(generatedContent);
      setIsGenerating(false);
    }, 3000);
  };

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
                <Link href="/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                  Dashboard
                </Link>
                <span className="px-3 py-2 rounded-lg text-sm font-medium bg-primary-100 text-primary-700">
                  Editor
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Draft
              </button>
              <button className="btn-primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Publish
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Generation Panel */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="text-heading-3 mb-6">AI Content Generator</h3>
              
              <div className="space-y-6">
                {/* Content Type Selector */}
                <div>
                  <label className="text-caption font-medium text-text-primary mb-2 block">
                    Content Type
                  </label>
                  <select 
                    className="input w-full"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                  >
                    <option value="blog-post">Blog Post</option>
                    <option value="social-media">Social Media Post</option>
                    <option value="email">Email Newsletter</option>
                    <option value="product-description">Product Description</option>
                    <option value="landing-page">Landing Page Copy</option>
                  </select>
                </div>

                {/* AI Prompt */}
                <div>
                  <label className="text-caption font-medium text-text-primary mb-2 block">
                    Describe what you want to create
                  </label>
                  <textarea
                    className="input w-full h-32 resize-none"
                    placeholder="e.g., Write a blog post about the future of AI in content marketing..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-text-inverse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate Content
                    </>
                  )}
                </button>

                {/* Quick Prompts */}
                <div>
                  <h4 className="text-heading-4 mb-3">Quick Prompts</h4>
                  <div className="space-y-2">
                    {[
                      "Write a compelling blog post about AI trends in 2024",
                      "Create a social media post about productivity tips",
                      "Draft an email newsletter about industry insights",
                      "Write a product description for a new software tool"
                    ].map((quickPrompt, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(quickPrompt)}
                        className="w-full text-left p-3 rounded-lg border border-border hover:bg-background-secondary transition-colors text-body-small"
                      >
                        {quickPrompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Features */}
                <div>
                  <h4 className="text-heading-4 mb-3">AI Features</h4>
                  <div className="space-y-2">
                    <button className="w-full btn-ghost text-left">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Improve Writing
                    </button>
                    <button className="w-full btn-ghost text-left">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Generate Outline
                    </button>
                    <button className="w-full btn-ghost text-left">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Add Keywords
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-heading-2">Content Editor</h2>
                <div className="flex items-center space-x-2">
                  <span className="badge badge-success">Auto-saved</span>
                  <span className="text-caption text-text-tertiary">Last saved 2 minutes ago</span>
                </div>
              </div>

              {/* Title Input */}
              <div className="mb-6">
                <input
                  type="text"
                  className="text-heading-1 w-full bg-transparent border-none outline-none placeholder-text-tertiary"
                  placeholder="Enter your title here..."
                />
              </div>

              {/* Content Editor */}
              <div className="min-h-[600px]">
                {content ? (
                  <div className="prose prose-lg max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-body leading-relaxed">
                      {content}
                    </pre>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 text-center">
                    <div>
                      <svg className="w-16 h-16 text-text-tertiary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="text-heading-3 text-text-secondary mb-2">Start Writing</h3>
                      <p className="text-body text-text-tertiary mb-4">
                        Use the AI generator on the left to create content, or start writing manually.
                      </p>
                      <button className="btn-secondary">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Start Writing
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 