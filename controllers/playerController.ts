// audioPlayer.ts
import TrackPlayer from 'react-native-track-player';
import {usePlaylistStore} from '../hooks/usePlaylistStore';

export const playCurrentTrack = async () => {
  const {id, chapter, currentChapterIndex, currentAudioIndex} =
    usePlaylistStore();

  const currentChapter = chapter[currentChapterIndex];
  if (!currentChapter) return;

  const trackUrl = `https://stage.addmeshbook.com/media/${chapter[currentChapterIndex]?.playlist[currentAudioIndex]}`;
  if (!trackUrl) return;

  await TrackPlayer.reset();

  await TrackPlayer.add({
    id: `${id}`,
    url: trackUrl,
    title: `Track ${currentAudioIndex + 1}`,
    artist: currentChapter.name,
  });

  await TrackPlayer.play();
};
