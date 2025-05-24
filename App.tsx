import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import './i18next/i18n.config';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RootNavigation from './navigation/RootNavigation';
import {AuthProvider} from './context/AuthContext';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import colors from './styles/color';

const queryClient = new QueryClient();

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.tertiory,
        zIndex: 110,
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
      style={{
        borderLeftColor: colors.purple,
        backgroundColor: colors.gray,
        zIndex: 110,
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
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
        </QueryClientProvider>
      </NavigationContainer>
      <Toast position="top" config={toastConfig} />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
