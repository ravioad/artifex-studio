import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


// apiClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._isRetry) {
//             originalRequest._isRetry = true; 

//             try {
//                 // Make a request to your backend's token refresh endpoint
//                 // This endpoint will use the HTTP-only refresh token to get new tokens
//                 await apiClient.post('/auth/refresh'); // Your backend sets new HTTP-only cookies

//                 // Retry the original failed request with the new access token
//                 return apiClient(originalRequest);
//             } catch (refreshError) {
//                 console.error('Token refresh failed:', refreshError);
//                 // If refresh fails (e.g., refresh token expired or invalid),
//                 // redirect to login page or show an error
//                 // window.location.href = '/login'; // Example redirection
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );


export default apiClient;