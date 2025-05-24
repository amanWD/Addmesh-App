import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Tabs from './Tabs';
import {RootNavigationParamList} from '../types/NavigationType';
import AccountStack from './AccountStack';
import {EpubReader} from '../screens/EpubReader';
import {WebViewPage} from '../screens/WebViewPage';
import {Cart} from '../screens/Cart';
import {Search} from '../screens/Search';

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
        options={{
          headerShown: false,
          presentation: 'modal',
          contentStyle: {zIndex: 100},
        }}
      />
      <Stack.Screen name="EpubReader" component={EpubReader} />
      <Stack.Screen
        name="WebViewPage"
        component={WebViewPage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
