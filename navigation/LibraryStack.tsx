import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Library} from '../screens/Library';
import BlogDetail from '../screens/Detail/BlogDetail';
import {StackParamList} from '../types/NavigationType';
import EBookDetail from '../screens/Detail/EbookDetail';
import AudioBookDetail from '../screens/Detail/AudioBookDetail';
import ExplanationAudioDetail from '../screens/Detail/ExplanationAudioDetail';
import EventDetail from '../screens/Detail/EventDetail';

const Stack = createNativeStackNavigator<StackParamList>();

export default function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
      <Stack.Screen name="EbookDetail" component={EBookDetail} />
      <Stack.Screen name="AudioBookDetail" component={AudioBookDetail} />
      <Stack.Screen
        name="ExplanationAudioDetail"
        component={ExplanationAudioDetail}
      />
      <Stack.Screen name="EventDetail" component={EventDetail} />
    </Stack.Navigator>
  );
}
