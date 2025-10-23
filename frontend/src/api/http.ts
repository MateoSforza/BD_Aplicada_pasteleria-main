import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // usa el proxy del vite.config
});

export default api;
