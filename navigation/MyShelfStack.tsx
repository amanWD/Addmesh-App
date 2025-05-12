import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BlogDetail from '../screens/Detail/BlogDetail';
import {MyShelf} from '../screens/MyShelf';
import {StackParamList} from '../types/NavigationType';
import EBookDetail from '../screens/Detail/EbookDetail';
import AudioBookDetail from '../screens/Detail/AudioBookDetail';
import ExplanationAudioDetail from '../screens/Detail/ExplanationAudioDetail';

const Stack = createNativeStackNavigator<StackParamList>();

export default function MyShelfStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyShelf" component={MyShelf} />
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
