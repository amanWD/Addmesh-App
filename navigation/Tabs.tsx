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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator<TabsParamList>();

export default function Tabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          header: () => <Header />,
          tabBarStyle: {backgroundColor: colors.gray, zIndex: 20, height: 80},
          tabBarActiveTintColor: colors.purple,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            tabBarIcon: ({color}) => (
              <AntDesign name="home" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="LibraryStack"
          component={LibraryStack}
          options={{
            title: 'Library',
            tabBarIcon: ({color}) => (
              <Ionicons name="library-outline" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MyShelfStack"
          component={MyShelfStack}
          options={{
            title: 'My Shelf',
            tabBarIcon: ({color}) => (
              <AntDesign name="book" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SavedStack"
          component={SavedStack}
          options={{
            title: 'Saved',
            tabBarIcon: ({color}) => (
              <Ionicons name="bookmarks-outline" size={23} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({color}) => (
              <AntDesign name="setting" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <AudioPlayer />
    </>
  );
}
