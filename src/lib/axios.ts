import axios from 'axios';
import { RootState, store } from './store';
import { logout, setAuth } from './store/authSlice';

// Tạo instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000, // 15s timeout
});

// Thêm interceptor để tự động thêm Authorization header nếu có token
api.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState(); // 🔥 Lấy state trực tiếp từ Redux store
    const authToken = state.auth.token;
    const token = typeof window !== 'undefined' ? authToken : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor để tự refresh token nếu bị 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken =
        localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');

      // const

      if (!refreshToken) {
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
          payload: { refreshToken: refreshToken, time: '14d' },
        });

        const { access_token, refresh_token } = response.data;

        // Lưu lại token mới
        if (localStorage.getItem('refresh_token')) {
          localStorage.setItem('auth_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
        } else {
          sessionStorage.setItem('auth_token', access_token);
          sessionStorage.setItem('refresh_token', refresh_token);
        }

        const currentUser = store.getState().auth.user;
        store.dispatch(
          setAuth({
            user: currentUser!,
            token: access_token,
            refreshToken: refresh_token,
            remember: !!localStorage.getItem('refresh_token'),
          }),
        );

        // Gửi lại request cũ với token mới
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
