import axios from 'axios';

// Tạo instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  timeout: 15000, // 15s timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động thêm Authorization header nếu có token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
