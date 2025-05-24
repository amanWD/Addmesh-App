import {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {usePlaylistStore} from '../hooks/usePlaylistStore';
import TrackPlayer, {State, useProgress} from 'react-native-track-player';
import colors from '../styles/color';
import {HoldableSkipButton} from './HoldableSkipButton';
import {SeekBar} from './SeekBar';
import {formatSeconds} from '../utils/audioPlayerUtils';

export const AudioPlayer = () => {
  const [openPlaylist, setOpenPlaylist] = useState(false);

  const {
    currentAudioIndex,
    setCurrentAudioIndex,
    setCurrentChapterIndex,
    chapters,
    setChapters,
    currentChapterIndex,
    trackImageUrl,
  } = usePlaylistStore();

  const {position} = useProgress();

  const duration =
    chapters[currentChapterIndex]?.playlist[currentAudioIndex]?.duration;

  const togglePlayPause = async () => {
    const state = await TrackPlayer.getState();

    if (state === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const skipForward = async () => {
    const pos = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(pos + 10);
  };

  const skipBackward = async () => {
    const pos = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(Math.max(0, pos - 10));
  };

  const skipToNext = async () => {
    if (
      currentAudioIndex < chapters[currentChapterIndex]?.playlist.length - 1 &&
      currentAudioIndex >= 0
    )
      setCurrentAudioIndex(currentAudioIndex + 1);
    else if (
      currentAudioIndex >=
      chapters[currentChapterIndex]?.playlist.length - 1
    ) {
      if (
        currentChapterIndex < chapters.length - 1 &&
        currentChapterIndex > -1
      ) {
        setCurrentAudioIndex(0);
        setCurrentChapterIndex(currentChapterIndex + 1);
      }
    }
    try {
      await TrackPlayer.skipToNext();
    } catch {
      console.warn('No next track');
    }
  };

  const skipToPrevious = async () => {
    if (
      currentAudioIndex < chapters[currentChapterIndex]?.playlist.length &&
      currentAudioIndex > 0
    )
      setCurrentAudioIndex(currentAudioIndex - 1);
    else if (currentAudioIndex > -1) {
      if (currentChapterIndex < chapters.length && currentChapterIndex > 0) {
        setCurrentAudioIndex(
          chapters[currentChapterIndex - 1]?.playlist.length - 1,
        );
        setCurrentChapterIndex(currentChapterIndex - 1);
      }
    }
    try {
      await TrackPlayer.skipToPrevious();
    } catch {
      console.warn('No previous track');
    }
  };

  const handleClosePlayer = async () => {
    await TrackPlayer.reset();
    setChapters([]);
  };

  return (
    <View
      style={[
        styles.container,
        {
          bottom: openPlaylist ? 30 : 90,
          height: openPlaylist ? '82%' : 80,
          // backgroundColor: openPlaylist ? 'transparent' : '#9e9e9e',
          display: chapters.length > 0 ? 'flex' : 'none',
        },
      ]}>
      <View style={[styles.playerContainer]}>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${(position / duration) * 100}%`,
                display: openPlaylist ? 'none' : 'flex',
              },
            ]}></View>
        </View>
        <TouchableOpacity
          onPress={() => setOpenPlaylist(prev => !prev)}
          style={styles.audioContainer}>
          <Image style={styles.audioImage} src={trackImageUrl} />
          <Text>
            {chapters[currentChapterIndex]?.playlist[currentAudioIndex].title}
          </Text>
        </TouchableOpacity>
        <View style={styles.playerControllerContainer}>
          <HoldableSkipButton
            title="Prev"
            onShortPress={skipToPrevious}
            onHoldStep={skipBackward}
          />
          <TouchableOpacity onPress={togglePlayPause}>
            <Text>Pa/Pl</Text>
          </TouchableOpacity>
          <HoldableSkipButton
            title="Nex"
            onShortPress={skipToNext}
            onHoldStep={skipForward}
          />
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={handleClosePlayer}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.playlistContainer, {height: openPlaylist ? '80%' : 0}]}>
        <SeekBar />
        <ScrollView>
          {chapters.map((chapter, chapterIndex) => {
            return (
              <View key={chapterIndex}>
                <Text
                  style={{textAlign: 'center', fontSize: 22, fontWeight: 500}}>
                  {chapter.name}
                </Text>
                <View style={{display: 'flex', gap: 3, padding: 10}}>
                  {chapter.playlist.map((audio, audioIndex) => {
                    return (
                      <TouchableOpacity
                        onPress={async () => {
                          setCurrentChapterIndex(chapterIndex);
                          setCurrentAudioIndex(audioIndex);

                          if (
                            currentAudioIndex === audioIndex &&
                            currentChapterIndex === chapterIndex
                          ) {
                            togglePlayPause();
                          } else {
                            await TrackPlayer.skip(
                              audioIndex + chapterIndex + 2 * chapterIndex,
                            );
                            await TrackPlayer.play();
                          }
                        }}
                        style={{
                          display: 'flex',
                          padding: 15,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                          height: 50,
                          backgroundColor:
                            currentAudioIndex === audioIndex &&
                            currentChapterIndex === chapterIndex
                              ? colors.secondary
                              : colors.lightGray,
                          borderColor: 'black',
                          borderRadius: 10,
                        }}
                        key={audioIndex}>
                        <Text>{audio.title}</Text>
                        <Text>{formatSeconds(audio.duration)}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    paddingTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    gap: 4,
    width: '100%',
    height: '80%',
    zIndex: 0,
  },
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  playerContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    height: 70,
    maxWidth: 500,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  audioContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  audioImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  audioTitleContainer: {
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerControllerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  playlistContainer: {
    width: '95%',
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 4,
    width: '100%',
    paddingHorizontal: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primaryBorder,
    borderRadius: 100,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: -10,
  },
});
