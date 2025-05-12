import {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {playCurrentTrack} from '../controllers/playerController';
import {usePlaylistStore} from '../hooks/usePlaylistStore';
import {useProgress} from 'react-native-track-player';

export const AudioPlayer = () => {
  const [openPlaylist, setOpenPlaylist] = useState(true);

  const progress = useProgress();

  const previousLengthRef = useRef(0);

  const {
    currentAudioIndex,
    setCurrentAudioIndex,
    setCurrentChapterIndex,
    chapter,
    setChapter,
    currentChapterIndex,
  } = usePlaylistStore();

  const startPlaying = async () => {
    if (chapter.length > 0 && chapter.length !== previousLengthRef.current) {
      await playCurrentTrack();
      previousLengthRef.current = chapter.length;
    }
    console.log(progress);
  };

  const handleNext = () => {
    if (
      currentAudioIndex < chapter[currentChapterIndex]?.playlist.length - 1 &&
      currentAudioIndex >= 0
    )
      setCurrentAudioIndex(currentAudioIndex + 1);
    else if (
      currentAudioIndex >=
      chapter[currentChapterIndex]?.playlist.length - 1
    ) {
      if (
        currentChapterIndex < chapter.length - 1 &&
        currentChapterIndex > -1
      ) {
        setCurrentAudioIndex(0);
        setCurrentChapterIndex(currentChapterIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (
      currentAudioIndex < chapter[currentChapterIndex]?.playlist.length &&
      currentAudioIndex > 0
    )
      setCurrentAudioIndex(currentAudioIndex - 1);
    else if (currentAudioIndex > -1) {
      if (currentChapterIndex < chapter.length && currentChapterIndex > 0) {
        setCurrentAudioIndex(
          chapter[currentChapterIndex - 1]?.playlist.length - 1,
        );
        setCurrentChapterIndex(currentChapterIndex - 1);
      }
    }
  };

  useEffect(() => {
    startPlaying();
  }, [chapter.length]);

  return (
    <View
      style={[
        styles.container,
        {bottom: openPlaylist ? 90 : 30, height: openPlaylist ? 80 : '82%'},
      ]}>
      <TouchableOpacity
        onPress={() => setOpenPlaylist(prev => !prev)}
        style={[styles.playerContainer, {height: chapter.length > 0 ? 70 : 0}]}>
        <Text>{chapter[currentChapterIndex]?.name}</Text>
        <TouchableOpacity onPress={handlePrevious}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Pause/Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Text>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => setChapter([])}>
          <Text>Close</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={[
          styles.playlistContainer,
          {height: openPlaylist ? 0 : '80%'},
        ]}></View>
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
    gap: 10,
    width: '100%',
    height: '80%',
    zIndex: 0,
    // backgroundColor: 'black',
  },
  playerContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '95%',
    maxWidth: 500,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  playlistContainer: {
    width: '95%',
    maxWidth: 500,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: -20,
  },
});
