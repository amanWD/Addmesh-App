import {AuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {AccountStackParamList} from '../types/NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserType} from '../types/AuthType';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

type NavigationProps = NativeStackNavigationProp<AccountStackParamList>;

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  const {navigate} = useNavigation<NavigationProps>();

  const initAuth = async () => {
    const token = await AsyncStorage.getItem('token');

    var initUser: null | UserType = null;

    if (
      token &&
      (authContext?.user === null || authContext?.user === undefined)
    ) {
      const decodedToken: any = jwtDecode(JSON.parse(token).access);

      initUser = {
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        phone_number: decodedToken.phone_number,
        is_admin: decodedToken.is_admin,
      };

      authContext?.setUser(initUser);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  if (authContext?.user) return children;
  else
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edcef5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProtectedRoute;
