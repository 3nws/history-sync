import { useMutation } from '@tanstack/react-query';
import base from './base';

const Services = {
  login: async (data) =>
    await base.post('auth/login', data).then((res) => {
      return res.data;
    })
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const useUserLogin = () => useMutation({ mutationFn: Services.login });
