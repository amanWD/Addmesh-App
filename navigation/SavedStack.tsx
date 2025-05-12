import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BlogDetail from '../screens/Detail/BlogDetail';
import {Saved} from '../screens/Saved';
import {StackParamList} from '../types/NavigationType';
import EBookDetail from '../screens/Detail/EbookDetail';
import AudioBookDetail from '../screens/Detail/AudioBookDetail';
import ExplanationAudioDetail from '../screens/Detail/ExplanationAudioDetail';

const Stack = createNativeStackNavigator<StackParamList>();

export default function SavedStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
      <Stack.Screen name="EbookDetail" component={EBookDetail} />
      <Stack.Screen name="AudioBookDetail" component={AudioBookDetail} />
      <Stack.Screen
        name="ExplanationAudioDetail"
        component={ExplanationAudioDetail}
      />
    </Stack.Navigator>
  );
}
