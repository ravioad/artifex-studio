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

export const logPageView = (details: Record<string, unknown>, message?: string) =>
    logUsageToServer({ event_type: 'page_view', message, details });

export const logErrorFrontend = (details: Record<string, unknown>, message?: string) =>
    logUsageToServer({ event_type: 'error_frontend', message, details });