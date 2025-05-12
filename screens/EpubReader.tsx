import {useRef} from 'react';
import {WebView} from 'react-native-webview';
import type {WebView as WebViewType} from 'react-native-webview';

export const EpubReader = () => {
  const webviewRef = useRef<WebViewType>(null);

  return (
    <WebView
      ref={webviewRef}
      originWhitelist={['*']}
      source={{uri: 'https://stage.addmeshbook.com'}}
      javaScriptEnabled
      onError={console.error}
    />
  );
};
