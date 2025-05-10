'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { loadFromStorage } from '../store/authSlice';

export const AuthLoader = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, []);

  return null;
};
