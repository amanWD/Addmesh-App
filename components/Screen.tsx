import {ReactNode, useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Loading from './Loading';
import colors from '../styles/color';
import {useRoute} from '@react-navigation/native';

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

  const router = useRoute();

  if (error?.status === 401) authContext?.setUser(null);

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <Loading size={32} color={colors.primaryBorder} />
        </View>
      ) : isError && error?.status === 401 ? (
        <TouchableOpacity>
          <Text>You need to login in order to access this page</Text>
        </TouchableOpacity>
      ) : data?.data?.length === 0 ? (
        <View style={styles.container}>
          <Text>
            {router.name === 'Library'
              ? 'Comming Soon!'
              : router.name === 'MyShelf'
              ? 'No item has been bought!'
              : router.name === 'Saved'
              ? 'No item has been saved!'
              : 'No Item'}
          </Text>
        </View>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
});
