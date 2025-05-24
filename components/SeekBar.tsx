import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';

import {formatSeconds} from '../utils/audioPlayerUtils';
import colors from '../styles/color';
import {usePlaylistStore} from '../hooks/usePlaylistStore';

export const SeekBar = () => {
  const {position} = useProgress(200); // updates every 200ms
  const [seeking, setSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  const {chapters, currentAudioIndex, currentChapterIndex} = usePlaylistStore();

  const currentChapter = chapters[currentChapterIndex];
  const currentTrack = currentChapter?.playlist?.[currentAudioIndex];
  const duration = currentTrack?.duration ?? 0;

  // Show seekValue while sliding, otherwise show real position
  const currentSliderValue = seeking ? seekValue : position;

  const onSlidingStart = () => {
    setSeeking(true);
  };

  const onSlidingComplete = async (value: number) => {
    const safeValue = Math.max(0, Math.min(value, duration));
    try {
      await TrackPlayer.seekTo(safeValue);
    } catch (error) {
      console.warn('Seek failed:', error);
    }
    setSeeking(false);
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentSliderValue}
        minimumTrackTintColor={colors.primaryBorder}
        maximumTrackTintColor={colors.secondary}
        thumbTintColor={colors.primaryBorder}
        onValueChange={setSeekValue}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        disabled={duration === 0}
      />
      <View style={styles.timeRow}>
        <Text style={styles.time}>{formatSeconds(currentSliderValue)}</Text>
        <Text style={styles.time}>{formatSeconds(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 12,
    color: '#555',
  },
});
