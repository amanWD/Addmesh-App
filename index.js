/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import TrackPlayer from 'react-native-track-player';
import trackPlayerService from './services/trackPlayerService';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => trackPlayerService);
