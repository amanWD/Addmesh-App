import {ReactNode, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Loading from './Loading';

type ScreenProps = {
  children: ReactNode;
  isLoading: boolean;
  isError: boolean;
  error: any;
  data: any;
};

export const Screen = ({
  children,
  isLoading,
  isError,
  error,
  data,
}: ScreenProps) => {
  const authContext = useContext(AuthContext);

  if (error?.status === 401) authContext?.setUser(null);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading size={18} color="black" />
      ) : isError && error?.status === 401 ? (
        <TouchableOpacity>
          <Text>Login</Text>
        </TouchableOpacity>
      ) : data?.data?.length === 0 ? (
        <Text>No Item</Text>
      ) : (
        <View>{children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 500,
  },
});
