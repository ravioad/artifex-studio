# Navigation Debugging System

This document explains the comprehensive navigation tracking system implemented to debug routing issues, particularly the Google OAuth redirect problem.

## Overview

The navigation tracking system provides detailed logging of all user navigation events, including:
- Route changes
- Authentication state changes
- Redirects
- Timing information
- Screen transitions

## Components

### 1. NavigationTracker Component
- **Location**: `src/components/NavigationTracker.tsx`
- **Purpose**: Automatically tracks all navigation events
- **Usage**: Add to any page with `screenName` prop for context

### 2. NavigationDebugger Component
- **Location**: `src/components/NavigationDebugger.tsx`
- **Purpose**: Development-only debug panel showing real-time navigation history
- **Usage**: Automatically included in development mode

### 3. Enhanced Logger
- **Location**: `src/utils/logger.ts`
- **Purpose**: Centralized logging with navigation-specific events
- **Event Type**: `page_view` (reused for navigation tracking)

## How to Use

### For Development Debugging

1. **Real-time Debug Panel**: In development mode, you'll see a red "Show Nav Debug" button in the bottom-right corner
2. **Click to Toggle**: Shows/hides the navigation history panel
3. **View History**: See the last 10 navigation events with timing and context
4. **Clear History**: Button to reset the navigation history

### For Production Monitoring

1. **Server Logs**: All navigation events are logged to your backend via the `page_view` event type
2. **Analytics**: Track user flow patterns and identify problematic routes
3. **Performance**: Monitor navigation timing to identify slow transitions

## Navigation Event Types

### 1. `initial_load`
- Triggered when a page first loads
- Includes authentication state and screen context

### 2. `route_change`
- Triggered when the user navigates to a different route
- Includes timing information and auth state

### 3. `auth_change`
- Triggered when authentication state changes
- Critical for debugging auth-related redirects

### 4. `redirect`
- Triggered when the app programmatically redirects the user
- Includes reason for redirect and source/destination paths

## Google OAuth Issue Fix

### Problem
Users were seeing the landing page briefly before being redirected to the dashboard after Google OAuth.

### Root Cause
The `/auth/google` route wasn't properly excluded from the route protection logic, causing the AuthContext to redirect authenticated users away from the OAuth callback page.

### Solution
1. **Added `/auth/google` to public routes**: Prevents premature redirects during OAuth
2. **Immediate redirect**: Removed the 2-second delay in Google OAuth callback
3. **Enhanced tracking**: Added specific logging for OAuth flow

### Code Changes
```typescript
// In AuthContext.tsx
const publicRoutes = ['/', '/auth/login', '/auth/signup', '/auth/check-email', '/auth/verify-email-complete', '/auth/forgot-password', '/auth/reset-password', '/auth/google'];

// Special handling for Google OAuth
if (isAuthenticated && isPublicRoute && pathname !== '/auth/google') {
  // Only redirect if not on Google OAuth callback
}
```

## Debugging Other Navigation Issues

### 1. Identify Slow Transitions
- Check the `duration` field in navigation events
- Look for patterns in slow routes

### 2. Track Authentication Issues
- Monitor `auth_change` events
- Check for unexpected auth state transitions

### 3. Analyze User Flow
- Review the navigation history to understand user paths
- Identify common navigation patterns

### 4. Performance Monitoring
- Track timing between route changes
- Identify bottlenecks in the navigation flow

## Best Practices

### 1. Add Screen Names
Always include a `screenName` when using NavigationTracker:
```typescript
<NavigationTracker screenName="dashboard-page" />
```

### 2. Monitor Production Logs
Regularly check your backend logs for `page_view` events to identify issues.

### 3. Use Development Debugger
During development, use the NavigationDebugger to quickly identify routing issues.

### 4. Track Custom Events
Add custom navigation tracking for specific user actions:
```typescript
navigationTracker.trackNavigation(
  pathname,
  authState,
  'custom_action',
  { customData: 'value' }
);
```

## Example Navigation Event

```json
{
  "event_type": "page_view",
  "message": "Navigation: redirect to /dashboard (authenticated)",
  "details": {
    "currentPath": "/dashboard",
    "authState": "authenticated",
    "trigger": "redirect",
    "navigationHistory": [...],
    "totalDuration": 150,
    "fromPath": "/auth/google",
    "redirectReason": "google_oauth_success",
    "oauthProvider": "google"
  }
}
```

## Troubleshooting

### Common Issues

1. **Missing Navigation Events**: Ensure NavigationTracker is included in the component tree
2. **Incorrect Auth State**: Check that the auth context is properly initialized
3. **Slow Navigation**: Look for heavy operations in useEffect hooks
4. **Infinite Redirects**: Check route protection logic for circular redirects

### Debug Steps

1. Enable the NavigationDebugger in development
2. Reproduce the issue
3. Check the navigation history for unexpected patterns
4. Review the timing between events
5. Check server logs for corresponding events

This system provides comprehensive visibility into your application's navigation flow, making it much easier to identify and fix routing issues. 