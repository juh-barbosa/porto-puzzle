import axios from 'axios';

const http = axios.create({
    baseURL: 'https://porto-puzzle-backend.vercel.app/api/'
});

http.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
});

export default http;
