import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Animated, Text, StyleSheet} from 'react-native';
import {toggleSave} from '../../utils/productUtils';
import Loading from '../Loading';
import {useIdListStore} from '../../hooks/useIdListStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {usePlaylistStore} from '../../hooks/usePlaylistStore';
import {Playlist, Track} from '../../types/PlaylistType';
import {addTracks} from '../../controllers/playerController';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/color';
import {ProductType} from '../../types/ProductType';

type CollapsibleImageProps = {
  data: any;
  scrollY: any;
  refetch: any;
  setId: any;
  type: ProductType;
};

export const CollapsibleHeader = ({
  data,
  scrollY,
  refetch,
  setId,
  type,
}: CollapsibleImageProps) => {
  const {idList, idType} = useIdListStore();

  const {setChapters, setTrackImageUrl, chapters} = usePlaylistStore();

  const {goBack, navigate} = useNavigation<any>();

  const {top} = useSafeAreaInsets();

  const [loadingSave, setLoadingSave] = useState(false);

  const next = () => {
    const index = idList.indexOf(data?.data.id);
    if (index === idList.length - 1) setId(idList[0]);
    else setId(idList[index + 1]);
  };

  const previous = () => {
    const index = idList.indexOf(data?.data.id);
    if (index === 0) setId(idList[idList.length - 1]);
    else setId(idList[index - 1]);
  };

  const addAudioBookToTrack = () => {
    var tracks: Track[] = [];
    data.data.playlist.map((audio: Playlist) => {
      tracks.push({
        id: audio.url,
        url: audio.url,
        title: audio.title,
        duration: audio.duration,
      });
    });
    addTracks(tracks);
  };

  const imageHeight = scrollY.interpolate({
    inputRange: [0, 350],
    outputRange: [350, 0],
    extrapolate: 'clamp',
  });
  const opacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const textBottomPosition = scrollY.interpolate({
    inputRange: [0, 350],
    outputRange: [10, 5],
    extrapolate: 'clamp',
  });
  const textLeftPosition = scrollY.interpolate({
    inputRange: [0, 350],
    outputRange: [210, 40],
    extrapolate: 'clamp',
  });
  const textOpacity = scrollY.interpolate({
    inputRange: [50, 350],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.header, {paddingTop: top}]}>
      <TouchableOpacity
        style={[styles.backBtn, {top: top + 35}]}
        onPress={goBack}>
        <Ionicons name="chevron-back" size={28} color={colors.primary} />
      </TouchableOpacity>
      {data?.data.is_bought || data?.data.is_free ? (
        <TouchableOpacity
          style={[styles.saveBtn, {top: top + 35}]}
          onPress={() => {
            toggleSave(data?.data.id, refetch, setLoadingSave);
          }}>
          {loadingSave ? (
            <Loading size={22} color="black" />
          ) : data?.data.is_saved ? (
            <Animated.View style={{opacity: opacity}}>
              <MaterialIcons
                name="bookmark-added"
                size={32}
                color={colors.green}
              />
            </Animated.View>
          ) : (
            <Animated.View style={{opacity: opacity}}>
              <MaterialIcons
                name="bookmark-add"
                size={32}
                color={colors.primary}
              />
            </Animated.View>
          )}
        </TouchableOpacity>
      ) : null}
      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
          opacity: opacity,
        }}>
        <TouchableOpacity
          style={[
            styles.prevBtn,
            {
              display: idList.length > 1 || idType === type ? 'flex' : 'none',
            },
          ]}
          onPress={previous}>
          <AntDesign name="banckward" size={32} color={colors.brown} />
        </TouchableOpacity>
        <Animated.Image
          src={data?.data.image}
          style={[
            styles.image,
            {height: imageHeight, width: type === 'Events' ? '90%' : '60%'},
          ]}
          resizeMode={'contain'}
        />
        <TouchableOpacity
          style={[
            styles.nextBtn,
            {
              display: idList.length > 1 || idType === type ? 'flex' : 'none',
            },
          ]}
          onPress={next}>
          <AntDesign name="forward" size={32} color={colors.brown} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.Text
        style={[
          styles.title,
          {
            position: 'absolute',
            left: textLeftPosition,
            bottom: textBottomPosition,
            opacity: textOpacity,
          },
        ]}>
        {data?.data.title?.slice(0, 18)}
        {data?.data.title?.length > 18 ? '...' : ''}
      </Animated.Text>
      {type === 'Ebooks' ? (
        <View
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            right: 20,
            bottom: -30,
            zIndex: 20,
          }}>
          <TouchableOpacity
            disabled={!data?.data.is_bought && !data?.data.is_free}
            style={{
              ...styles.actionBtn,
              opacity: !data?.data.is_bought && !data?.data.is_free ? 0.5 : 1,
            }}
            onPress={() =>
              navigate('WebViewPage', {
                uri: 'https://stage.addmeshbook.com/Library/Reader',
              })
            }>
            <Text
              style={{
                fontWeight: '900',
                fontSize: 12,
                position: 'absolute',
                top: -16,
              }}>
              Read
            </Text>
            <FontAwesome5 name="book-open" size={24} color={colors.green2} />
          </TouchableOpacity>
        </View>
      ) : type === 'Audio Books' ? (
        <View
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            right: 20,
            bottom: -30,
            zIndex: 20,
          }}>
          <TouchableOpacity
            disabled={!data?.data.is_bought && !data?.data.is_free}
            style={{
              ...styles.actionBtn,
              opacity: !data?.data.is_bought && !data?.data.is_free ? 0.5 : 1,
            }}
            onPress={() => {
              setChapters([
                {name: data?.data.title, playlist: data?.data.playlist},
              ]);
              setTrackImageUrl(data?.data.image);
              addAudioBookToTrack();
            }}>
            <Text
              style={{
                fontWeight: '900',
                fontSize: 12,
                position: 'absolute',
                top: -16,
              }}>
              Play
            </Text>
            <MaterialIcons
              name="play-arrow"
              size={38}
              color={colors.green2}
              style={{position: 'absolute', top: 9, right: 13}}
            />
          </TouchableOpacity>
        </View>
      ) : type === 'Explanation Audios' ? (
        <View
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            right: 20,
            bottom: -30,
            zIndex: 20,
          }}>
          <TouchableOpacity
            disabled={!data?.data.is_bought && !data?.data.is_free}
            style={{
              ...styles.actionBtn,
              opacity: !data?.data.is_bought && !data?.data.is_free ? 0.5 : 1,
            }}
            onPress={() => {
              setChapters(data?.data.chapters);
            }}>
            <Text
              style={{
                fontWeight: '900',
                fontSize: 12,
                position: 'absolute',
                top: -16,
              }}>
              Play
            </Text>
            <MaterialIcons
              name="play-arrow"
              size={38}
              color={colors.green2}
              style={{position: 'absolute', top: 9, right: 13}}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            gap: 20,
            right: 20,
            bottom: -30,
            zIndex: 20,
          }}>
          <TouchableOpacity
            disabled={!data?.data.is_bought && !data?.data.is_free}
            style={{
              ...styles.actionBtn,
              opacity: !data?.data.is_bought && !data?.data.is_free ? 0.5 : 1,
            }}>
            <Text
              style={{
                fontWeight: '900',
                fontSize: 12,
                position: 'absolute',
                top: -16,
              }}>
              Join
            </Text>
            <Ionicons
              name="enter"
              size={28}
              color={colors.green2}
              style={{position: 'absolute', left: 12}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#b088ba',
  },
  prevBtn: {
    position: 'absolute',
    left: -45,
    padding: 8,
  },
  nextBtn: {
    position: 'absolute',
    right: -45,
    padding: 8,
  },
  backBtn: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
  },
  saveBtn: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
  },
  image: {
    margin: 20,
    paddingBottom: 30,
    width: 250,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  actionBtn: {
    width: 55,
    backgroundColor: '#552f6e',
    padding: 11,
    aspectRatio: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  },
});
