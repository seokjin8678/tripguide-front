import axios from 'axios';
const HOST = process.env.NEXT_PUBLIC_ENV_HOST
const PORT = process.env.NEXT_PUBLIC_ENV_PORT
const BASE_URL = `${HOST}:${PORT}`

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});