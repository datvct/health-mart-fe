import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  remember: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  remember: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        refreshToken: string;
        remember: boolean;
      }>,
    ) => {
      const { user, token, refreshToken, remember } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.remember = remember;

      if (remember) {
        localStorage.setItem('auth_user', JSON.stringify(user));
        localStorage.setItem('auth_token', token);
        localStorage.setItem('refresh_token', refreshToken);
      } else {
        sessionStorage.setItem('auth_user', JSON.stringify(user));
        sessionStorage.setItem('auth_token', token);
        sessionStorage.setItem('refresh_token', refreshToken);
      }

      document.cookie = `auth_user=${JSON.stringify(user)}; path=/`;
    },
    loadFromStorage: (state) => {
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');
      const storedRefresh = localStorage.getItem('refresh_token');

      // Không đăng nhập
      const storedUserSession = sessionStorage.getItem('auth_user');
      const storedTokenSession = sessionStorage.getItem('auth_token');
      const storedRefreshSession = sessionStorage.getItem('refresh_token');

      if (storedUser && storedToken && storedRefresh) {
        state.user = JSON.parse(storedUser);
        state.token = storedToken;
        state.refreshToken = storedRefresh;
        state.remember = true;
      }

      if (storedUserSession && storedTokenSession && storedRefreshSession) {
        state.user = JSON.parse(storedUserSession);
        state.token = storedTokenSession;
        state.refreshToken = storedRefreshSession;
        state.remember = false;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.remember = false;
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = 'auth_user=; Max-Age=0; path=/';
    },
    updateProfile: (state, action) => {
      state.user = action.payload;
      if (state.remember == true) {
        localStorage.setItem('auth_user', JSON.stringify(action.payload));
      } else {
        sessionStorage.setItem('auth_user', JSON.stringify(action.payload));
      }
    },
  },
});

export const { setAuth, loadFromStorage, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
