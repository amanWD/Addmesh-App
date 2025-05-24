import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {useCartStore} from '../hooks/useCartStore';
import {useContext, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {RootNavigationParamList} from '../types/NavigationType';

type WebViewRouteProp = RouteProp<RootNavigationParamList, 'WebViewPage'>;

export const WebViewPage = () => {
  const {top} = useSafeAreaInsets();

  const route = useRoute<WebViewRouteProp>();
  const {uri} = route.params;

  const {goBack} = useNavigation();

  const webViewRef = useRef<null | WebView>(null);

  const authContext = useContext(AuthContext);
  const {cart} = useCartStore();

  const [progress, setProgress] = useState(0);

  const phoneData = JSON.stringify(
    `{"phoneData": {"token": ${JSON.stringify(
      authContext?.token,
    )}, "cart": ${JSON.stringify(cart)}}}`,
  );

  const script = `
    localStorage.setItem('phoneData', ${phoneData});
    true;
  `;

  return (
    <View style={styles.container}>
      <View style={{height: top + 35, position: 'relative'}}>
        <TouchableOpacity
          onPress={goBack}
          style={{position: 'absolute', bottom: 0, left: 10, padding: 10}}>
          <Text>Back</Text>
        </TouchableOpacity>
        <View
          style={{
            display: progress === 1 ? 'none' : 'flex',
            height: 4,
            width: `${progress * 100}%`,
            backgroundColor: 'purple',
            position: 'absolute',
            bottom: 0,
            borderRadius: 10,
          }}></View>
      </View>
      <WebView
        ref={webViewRef}
        source={{uri: uri}}
        style={{width: '100%', height: '100%'}}
        onLoadProgress={({nativeEvent}) => setProgress(nativeEvent.progress)}
        onLoad={() => {
          console.log('Loaded');
          webViewRef.current?.injectJavaScript(script);
        }}
        javaScriptEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edcef5',
  },
});
