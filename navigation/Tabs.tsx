import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home} from '../screens/Home';
import {Settings} from '../screens/Settngs';
import SavedStack from './SavedStack';
import LibraryStack from './LibraryStack';
import MyShelfStack from './MyShelfStack';
import Header from '../components/Headers/Header';
import colors from '../styles/color';
import {TabsParamList} from '../types/NavigationType';
import {AudioPlayer} from '../components/AudioPlayer';

const Tab = createBottomTabNavigator<TabsParamList>();

export default function Tabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          header: Header,
          tabBarStyle: {backgroundColor: colors.gray, zIndex: 20, height: 80},
          tabBarActiveTintColor: colors.purple,
        }}>
        <Tab.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Tab.Screen
          name="LibraryStack"
          component={LibraryStack}
          options={{title: 'Library'}}
        />
        <Tab.Screen
          name="MyShelfStack"
          component={MyShelfStack}
          options={{title: 'My Shelf'}}
        />
        <Tab.Screen
          name="SavedStack"
          component={SavedStack}
          options={{title: 'Saved'}}
        />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
      <AudioPlayer />
    </>
  );
}
