import TrackPlayer, {Capability} from 'react-native-track-player';
import {Track} from '../types/PlaylistType';

export const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
      Capability.SeekTo,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
};

export const addTracks = async (tracks: Track[]) => {
  setupPlayer();

  await TrackPlayer.add(tracks);

  await TrackPlayer.play();
};
