import axios from 'axios';
import { auth, username } from '../root';

const api = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        "authorization": `Bearer ${auth}`,
        "username": username
    }
});

export default api;

