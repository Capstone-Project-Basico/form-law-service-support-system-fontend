'use client';

import axios from 'axios';

const getToken = () => {
  if (typeof window === 'undefined') return null;

  return JSON.parse(localStorage.getItem('auth-token') || '');
};

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
});

export default axiosClient;
