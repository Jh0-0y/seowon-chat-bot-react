import axios from 'axios';

export const getTestAxiosInstance = () => {
  const rawHost = localStorage.getItem('customBaseURL') || 'localhost:8080';
  const customBaseUrl = `http://${rawHost}/api`;

  const instance = axios.create({
    baseURL: customBaseUrl,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};