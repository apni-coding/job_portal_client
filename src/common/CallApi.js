import axios from 'axios';

const api = axios.create();

// Error Handling Middleware
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            // Handle server errors (status code >= 400)
            throw error.response.data;
        } else if (error.request) {
            // Handle network errors (no response received)
            throw 'Network error: Unable to reach server';
        } else {
            // Handle request setup errors (e.g., CORS, timeout)
            throw 'Request error: Unable to setup request';
        }
    }
);

// Common API function for making requests
export const callApi = async (method, url, data = null, token = null, params = null) => {
    try {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await api({
            method,
            url,
            data,
            params,
            headers
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Export the axios instance for advanced usage
export default api;
