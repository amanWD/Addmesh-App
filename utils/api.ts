import {baseUrl} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = baseUrl;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const accessToken = JSON.parse(token).access;
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await AsyncStorage.getItem('token');
        let refreshToken = '';

        if (token) {
          refreshToken = JSON.parse(token).refresh;
          console.log(refreshToken);
        }

        const refreshResponse = await axios.post(
          `${BASE_URL}account/auth/jwt/refresh/`,
          {refresh: refreshToken},
        );
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(refreshResponse.data),
        );

        api.defaults.headers.common[
          'Authorization'
        ] = `JWT ${refreshResponse.data.access}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.log('Refresh token has expired!');
        console.log('You are logged out!');

        await AsyncStorage.removeItem('token');
      }
    }
    return Promise.reject(error);
  },
);

export default api;
