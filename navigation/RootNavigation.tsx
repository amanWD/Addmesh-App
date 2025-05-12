import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Tabs from './Tabs';
import {RootNavigationParamList} from '../types/NavigationType';
import AccountStack from './AccountStack';
import {EpubReader} from '../screens/EpubReader';

const Stack = createNativeStackNavigator<RootNavigationParamList>();

export default function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Account"
        component={AccountStack}
        options={{headerShown: false, presentation: 'modal'}}
      />
      <Stack.Screen
        name="EpubReader"
        component={EpubReader}
        // options={{headerShown: false, presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
}
