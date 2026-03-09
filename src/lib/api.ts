import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        // 1. Determine which token to use
        // We can reliably check window.location.pathname since these API calls are made from the client
        let isPortalRoute = false;
        if (typeof window !== 'undefined') {
            isPortalRoute = window.location.pathname.startsWith('/portal');
        } else if (config.url) {
            isPortalRoute = config.url.startsWith('/portal');
        }

        const tokenName = isPortalRoute ? 'portalToken' : 'token';
        const token = Cookies.get(tokenName);

        // 2. Attach the token to the Authorization header if it exists
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;