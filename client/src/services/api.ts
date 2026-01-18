import axios from 'axios';

const API_URL = ((import.meta as unknown) as any)?.env?.VITE_API_URL || 'http://localhost:5000';
const api = axios.create({ baseURL: API_URL + '/api' });

api.interceptors.request.use((config: any) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
    }
  } catch (_) {
    // ignore
  }
  return config;
});

export default api;
