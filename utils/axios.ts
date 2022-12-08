import axios from 'axios';
import store from '../store/store';

const HOST = process.env.NEXT_PUBLIC_ENV_HOST;
const PORT = process.env.NEXT_PUBLIC_ENV_PORT;
const BASE_URL = `${HOST}:${PORT}`;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': '',
    }
});

api.interceptors.request.use(
    config => {
        const token = store.getState().auth.token;
        try {
            if (token) {
                config.headers!.Authorization = token;
            }
            return config;
        } catch (err) {
            console.log(err);
        }
        return config;
    }, error => Promise.reject(error)
);

export default api;