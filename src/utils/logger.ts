import apiClient from "./api";

interface UsageLogEntry {
    event_type: 'ai_generate' | 'content_save' | 'content_publish' | 'login_attempt' | 'error_frontend' | 'logout' | 'page_view' | 'premium_feature_access';
    message?: string;
    details?: Record<string, unknown>;
}

export const logUsageToServer = async ({ event_type, message, details }: UsageLogEntry) => {
    try {
        await apiClient.post('api/logger/usage-logs', { event_type, message, details }); // Calls your Express.js backend
        // console.log(`Usage log sent: ${event_type}`); // For debugging
    } catch (error) {
        console.error(`Failed to send usage log (${event_type}) to server:`, error);
    }
};

export const logLogin = (details: Record<string, unknown>, message?: string) =>
    logUsageToServer({ event_type: 'login_attempt', message, details });

export const logAiGenerate = (details: Record<string, unknown>, message?: string) =>
    logUsageToServer({ event_type: 'ai_generate', message, details });

export const logContentSave = (details: Record<string, unknown>, message?: string) =>
    logUsageToServer({ event_type: 'content_save', message, details });

// export const logPageView = (details: Record<string, unknown>, message?: string) =>
//     logUsageToServer({ event_type: 'page_view', message, details });

export const logErrorFrontend = (details: Record<string, unknown>, message?: string) =>
    logUsageToServer({ event_type: 'error_frontend', message, details });

export const logNavigationTrace = (details: Record<string, unknown>, message?: string) =>
    logUsageToServer({ event_type: 'page_view', message, details });

// Enhanced navigation tracking with timing
export const createNavigationTracker = () => {
    let navigationHistory: Array<{
        pathname: string;
        timestamp: number;
        duration?: number;
        authState: 'loading' | 'authenticated' | 'unauthenticated';
        trigger: 'route_change' | 'auth_change' | 'initial_load' | 'redirect';
    }> = [];

    const trackNavigation = (
        pathname: string, 
        authState: 'loading' | 'authenticated' | 'unauthenticated',
        trigger: 'route_change' | 'auth_change' | 'initial_load' | 'redirect',
        additionalDetails?: Record<string, unknown>
    ) => {
        const timestamp = Date.now();
        const lastEntry = navigationHistory[navigationHistory.length - 1];
        
        if (lastEntry) {
            lastEntry.duration = timestamp - lastEntry.timestamp;
        }

        const newEntry = {
            pathname,
            timestamp,
            authState,
            trigger
        };

        navigationHistory.push(newEntry);

        // Log the navigation event
        logNavigationTrace({
            currentPath: pathname,
            authState,
            trigger,
            navigationHistory: navigationHistory.slice(-5), // Last 5 entries
            totalDuration: lastEntry ? lastEntry.duration : 0,
            ...additionalDetails
        }, `Navigation: ${trigger} to ${pathname} (${authState})`);

        // Keep only last 10 entries to prevent memory leaks
        if (navigationHistory.length > 10) {
            navigationHistory = navigationHistory.slice(-10);
        }
    };

    const getNavigationHistory = () => navigationHistory;

    const clearHistory = () => {
        navigationHistory = [];
    };

    return {
        trackNavigation,
        getNavigationHistory,
        clearHistory
    };
};

// Global navigation tracker instance
export const navigationTracker = createNavigationTracker();