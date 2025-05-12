import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AccountStackParamList} from '../types/NavigationType';
import {Profile} from '../screens/Account/Profile';
import {Register} from '../screens/Account/Register';
import {VerifyOtp} from '../screens/Account/VerifyOtp';
import {ForgetPassword} from '../screens/Account/ForgetPassword';
import {ForgetPasswordConfirm} from '../screens/Account/ForgetPasswordConfirm';
import {ChangePassword} from '../screens/Account/ChangePassword';
import AuthenticationHeader from '../components/Headers/AuthenticationHeader';
import {Login} from '../screens/Account/Login';

const Stack = createNativeStackNavigator<AccountStackParamList>();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{header: AuthenticationHeader, presentation: 'modal'}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen
        name="ForgetPasswordConfirm"
        component={ForgetPasswordConfirm}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}
