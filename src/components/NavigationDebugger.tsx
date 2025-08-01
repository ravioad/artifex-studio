'use client';

import { useState, useEffect } from 'react';
import { navigationTracker } from '@/utils/logger';

export default function NavigationDebugger() {
  const [isVisible, setIsVisible] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<Array<{
    pathname: string;
    timestamp: number;
    duration?: number;
    authState: 'loading' | 'authenticated' | 'unauthenticated';
    trigger: 'route_change' | 'auth_change' | 'initial_load' | 'redirect';
  }>>([]);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const updateHistory = () => {
      setNavigationHistory(navigationTracker.getNavigationHistory());
    };

    // Update history every second
    const interval = setInterval(updateHistory, 1000);
    updateHistory(); // Initial update

    return () => clearInterval(interval);
  }, []);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-3 py-2 rounded-md text-sm font-mono"
        style={{ zIndex: 9999 }}
      >
        {isVisible ? 'Hide' : 'Show'} Nav Debug
      </button>

      {/* Debug panel */}
      {isVisible && (
        <div 
          className="fixed bottom-16 right-4 z-50 bg-black text-green-400 p-4 rounded-md text-xs font-mono max-w-md max-h-96 overflow-auto"
          style={{ zIndex: 9999 }}
        >
          <h3 className="text-white mb-2 font-bold">Navigation History</h3>
          <div className="space-y-2">
            {navigationHistory.map((entry, index) => (
              <div key={index} className="border-b border-gray-700 pb-1">
                <div className="text-yellow-400">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </div>
                <div className="text-green-400">
                  Path: {entry.pathname}
                </div>
                <div className="text-blue-400">
                  Auth: {entry.authState} | Trigger: {entry.trigger}
                </div>
                {entry.duration && (
                  <div className="text-purple-400">
                    Duration: {entry.duration}ms
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => navigationTracker.clearHistory()}
            className="mt-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
          >
            Clear History
          </button>
        </div>
      )}
    </>
  );
} 