import {createContext, useState, useEffect} from 'react';
import api from '../utils/api';
import {jwtDecode} from 'jwt-decode';
import {AxiosResponse} from 'axios';
import {
  ChangePasswordType,
  RegisterUserType,
  TokenType,
  UserType,
} from '../types/AuthType';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: null | UserType;
  setUser: any;
  token: null | TokenType;
  initAuth: () => void;
  register: (
    user: RegisterUserType,
  ) => Promise<AxiosResponse<any, any> | undefined>;
  verifyOTP: (
    activation_code: string,
  ) => Promise<AxiosResponse<any, any> | undefined>;
  resendOTP: (
    email: string,
    phone_number: string,
    preferred_contact: 'email' | 'phone',
  ) => Promise<AxiosResponse<any, any> | undefined>;
  login: (
    email: string,
    password: string,
  ) => Promise<AxiosResponse<any, any> | undefined>;
  getRefreshToken: () => Promise<void>;
  logout: () => void;
  updateUserInfo: (
    name: string,
  ) => Promise<AxiosResponse<any, any> | undefined>;
  transferAccount: (
    newEmailOrPhone: string,
    password: string,
    transferType: 'email' | 'phone',
  ) => Promise<AxiosResponse<any, any> | undefined>;
  transferAccountConfirm: (
    newEmailOrPhone: string,
    code: string,
    transferType: 'email' | 'phone',
  ) => Promise<AxiosResponse<any, any> | undefined>;
  changePassword: (
    passwordData: ChangePasswordType,
  ) => Promise<AxiosResponse<any, any> | undefined>;
  deleteAccount: (password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<null | UserType>(null);
  const [token, setToken] = useState<null | TokenType>(null);

  const initAuth = async () => {
    const token = await AsyncStorage.getItem('token');

    var initUser: null | UserType = null;
    var initToken: null | TokenType = null;

    if (token) {
      const decodedToken: any = jwtDecode(JSON.parse(token).access);

      initUser = {
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        phone_number: decodedToken.phone_number,
        is_admin: decodedToken.is_admin,
      };

      initToken = JSON.parse(token);

      setUser(initUser);
      setToken(initToken);
    }
  };

  const register = async (user: RegisterUserType) => {
    try {
      const response = await api.post('account/auth/users/', {
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        password: user.password,
        re_password: user.re_password,
        preferred_contact: user.preferred_contact,
        is_admin: 'False',
      });

      return response;
    } catch (error) {
      console.error('Register Failed ', error);
    }
  };

  const verifyOTP = async (activation_code: string) => {
    try {
      const response = await api.post('account/auth/activate/', {
        activation_code: activation_code,
      });

      return response;
    } catch (error) {
      console.log('Verification failed ', error);
    }
  };

  const resendOTP = async (
    email: string,
    phone_number: string,
    preferred_contact: 'email' | 'phone',
  ) => {
    try {
      const response = await api.post('account/auth/resend-activation/', {
        email_or_phone: preferred_contact === 'email' ? email : phone_number,
      });

      return response;
    } catch (error) {
      console.log('Failed Resending Code');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('account/auth/jwt/create/', {
        email,
        password,
      });

      setToken(response.data);

      console.log(response);

      await AsyncStorage.setItem('token', JSON.stringify(response.data));

      if (response.data) {
        const decodedToken: any = jwtDecode(response.data.access);

        setUser({
          id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
          phone_number: decodedToken.phone_number,
          is_admin: decodedToken.is_admin,
        });

        return response;
      }
    } catch (e) {
      console.error('login failed ', e);
    }
  };

  const getRefreshToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      let refreshToken = '';

      if (token) {
        refreshToken = JSON.parse(token).refresh;
      }

      const response = await api.post('account/auth/jwt/refresh/', {
        refresh: refreshToken,
      });

      setToken(response.data);
      await AsyncStorage.setItem('token', JSON.stringify(response.data));
    } catch (refreshError) {
      console.log('Refresh token has expired!');
      console.log('You are logged out!');

      await AsyncStorage.removeItem('token');
      setToken(null);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const updateUserInfo = async (name: string) => {
    try {
      const response = await api.patch('account/auth/users/me/', {
        name: name,
      });

      setUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        is_admin: response.data.is_admin,
      });

      await getRefreshToken();

      return response;
    } catch (e) {
      console.error('Updating user info faied', e);
    }
  };

  const transferAccount = async (
    newEmailOrPhone: string,
    password: string,
    transferType: 'email' | 'phone',
  ) => {
    try {
      const response = await api.post('account/auth/transfer-account/', {
        new_email_or_phone: newEmailOrPhone,
        transfer_type: transferType,
        current_password: password,
      });

      return response;
    } catch (e) {
      console.log('Email transfer failed', e);
    }
  };

  const transferAccountConfirm = async (
    newEmailOrPhone: string,
    code: string,
    transferType: 'email' | 'phone',
  ) => {
    try {
      const response = await api.post(
        'account/auth/transfer-account-confirm/',
        {
          new_email_or_phone: newEmailOrPhone,
          transfer_type: transferType,
          code: code,
        },
      );

      return response;
    } catch (e) {
      console.log('Email transfer failed', e);
    }
  };

  const changePassword = async (passwordData: ChangePasswordType) => {
    try {
      const response = await api.post('account/auth/users/set_password/', {
        ...passwordData,
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAccount = async (password: string) => {
    try {
      const response = await api.delete('account/auth/users/me/', {
        data: {
          current_password: password,
        },
      });

      await AsyncStorage.removeItem('token');
      setUser(null);
      setToken(null);

      console.log(response);
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        initAuth,
        register,
        verifyOTP,
        resendOTP,
        login,
        getRefreshToken,
        logout,
        updateUserInfo,
        transferAccount,
        transferAccountConfirm,
        changePassword,
        deleteAccount,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
