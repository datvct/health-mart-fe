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
      }

      document.cookie = `auth_user=${JSON.stringify(user)}; path=/`;
    },
    loadFromStorage: (state) => {
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');
      const storedRefresh = localStorage.getItem('refresh_token');

      if (storedUser && storedToken && storedRefresh) {
        state.user = JSON.parse(storedUser);
        state.token = storedToken;
        state.refreshToken = storedRefresh;
        state.remember = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.remember = false;
      localStorage.clear();
      document.cookie = 'auth_user=; Max-Age=0; path=/';
    },
  },
});

export const { setAuth, loadFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
