import axios from 'axios';
import {  message } from 'antd';

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
export const callApi = async (method, url, data = null, params = null) => {
    try {
        const response = await api({
            method,
            url,
            data,
            params,
           
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Export the axios instance for advanced usage
export default api;


/*

 try {
        // Example GET request
        const userData = await callApi('get', '/users');
        console.log(userData);

        // Example POST request with data
        const postData = await callApi('post', '/posts', { title: 'New Post', body: 'Lorem ipsum' });
        console.log(postData);

        // Example DELETE request with query parameters
        const deletedData = await callApi('delete', '/posts/1', null, { userId: 1 });
        console.log(deletedData);
    } catch (error) {
        console.error('API Error:', error);
    }
    */