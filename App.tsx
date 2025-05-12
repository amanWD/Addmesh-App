import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import './i18next/i18n.config';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RootNavigation from './navigation/RootNavigation';
import {AuthProvider} from './context/AuthContext';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import colors from './styles/color';
import TrackPlayer from 'react-native-track-player';
import trackPlayerService from './services/trackPlayerService';
const queryClient = new QueryClient();

TrackPlayer.registerPlaybackService(() => trackPlayerService);

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.purple,
        backgroundColor: colors.gray,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 13,
        color: 'red',
      }}
    />
  ),
};

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <RootNavigation />
          <Toast position="bottom" config={toastConfig} />
        </QueryClientProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
