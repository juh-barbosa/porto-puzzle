import axios from 'axios';

const http = axios.create({
    baseURL: 'https://porto-puzzle-backend.vercel.app/api/'
});

export default http;
