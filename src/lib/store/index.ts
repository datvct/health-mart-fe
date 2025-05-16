import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// 6. Type hỗ trợ
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
