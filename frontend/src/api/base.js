import axios from 'axios';

import { toast } from 'react-toastify';

const base = axios.create({
  baseURL: `${import.meta.env.VITE_NEST_API_URL}/api/`
});

base.defaults.headers.common = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'ngrok-skip-browser-warning': 'true'
};

base.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

base.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await base.post('auth/refresh', {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken')
          });

          const data = rs.data;
          const { accessToken, refreshToken } = data;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          return base(originalConfig);
        } catch (_error) {
          toast.error('Session time out');

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');

          window.location.href = `${window.location.origin}/login`;

          return Promise.reject(_error);
        }
      } else {
        const { response, config } = err;
        const { url } = config;
        const { data, status } = response;
        const { message } = data;

        if (status !== 401 && url !== 'auth/refresh') {
          if (message) {
            const key = status === 404 ? 'Not Found.' : message;

            toast.warning(key);
          } else {
            toast.error('Unexpected error!');
          }
        }
      }
    }

    return Promise.reject(err);
  }
);

export default base;
