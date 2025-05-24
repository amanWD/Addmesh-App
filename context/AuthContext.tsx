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
  register: (user: RegisterUserType) => Promise<any>;
  verifyOTP: (
    activation_code: string,
  ) => Promise<AxiosResponse<any, any> | undefined>;
  resendOTP: (email: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  getRefreshToken: () => Promise<void>;
  logout: () => void;
  updateUserInfo: (name: string) => Promise<any>;
  transferAccount: (
    newEmail: string,
    newPhone: string,
    transferType: 'email' | 'phone',
    password: string,
  ) => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  resetPasswordConfirm: (
    email: string,
    code: string,
    new_password: string,
    re_new_password: string,
  ) => Promise<any>;
  changePassword: (passwordData: ChangePasswordType) => Promise<any>;
  deleteAccount: (password: string) => Promise<any>;
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
      return error;
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

  const resendOTP = async (email: string) => {
    try {
      const response = await api.post('account/auth/resend-activation/', {
        email_or_phone: email,
      });

      return response;
    } catch (error) {
      return error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('account/auth/jwt/create/', {
        email,
        password,
      });

      setToken(response.data);

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
      return e;
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

      return response;
    } catch (e) {
      return e;
    }
  };

  const transferAccount = async (
    newEmail: string,
    newPhone: string,
    transferType: 'email' | 'phone',
    password: string,
  ) => {
    try {
      const response = await api.post('account/auth/transfer-account/', {
        new_email: newEmail,
        new_phone: newPhone,
        transfer_type: transferType,
        current_password: password,
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await api.post('account/auth/reset-password/', {
        email: email,
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const resetPasswordConfirm = async (
    email: string,
    code: string,
    new_password: string,
    re_new_password: string,
  ) => {
    try {
      const response = await api.post('account/auth/reset-password-confirm/', {
        email: email,
        code: code,
        new_password: new_password,
        re_new_password: re_new_password,
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const changePassword = async (passwordData: ChangePasswordType) => {
    try {
      const response = await api.post('account/auth/users/set_password/', {
        ...passwordData,
      });

      return response;
    } catch (error) {
      return error;
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
      return error;
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
        resetPassword,
        resetPasswordConfirm,
        changePassword,
        deleteAccount,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
