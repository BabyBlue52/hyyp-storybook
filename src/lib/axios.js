import axios from 'axios';

/**
 * Shared axios instance. Reads `VITE_API_BASE_URL` so Storybook builds
 * succeed without a running API; runtime requests still need a real backend.
 */
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
