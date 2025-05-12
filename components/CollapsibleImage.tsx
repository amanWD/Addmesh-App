import React, {useState} from 'react';
import {View, TouchableOpacity, Animated, Text, StyleSheet} from 'react-native';
import {toggleSave} from '../utils/productUtils';
import Loading from './Loading';
import {useIdListStore} from '../hooks/useIdListStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {usePlaylistStore} from '../hooks/usePlaylistStore';

type CollapsibleImageProps = {
  data: any;
  scrollY: any;
  refetch: any;
  type: 'Ebook' | 'Audio Book' | 'Explanation Audio' | 'Event';
};

export const CollapsibleImage = ({
  data,
  scrollY,
  refetch,
  type,
}: CollapsibleImageProps) => {
  const {idList, idType} = useIdListStore();

  const {setChapter} = usePlaylistStore();

  const {goBack} = useNavigation();

  const [ebookId, setEbookId] = useState(data?.data.id);

  const {top} = useSafeAreaInsets();

  const [loadingSave, setLoadingSave] = useState(false);

  const next = () => {
    const index = idList.indexOf(ebookId);
    if (index === idList.length - 1) setEbookId(idList[0]);
    else setEbookId(idList[index + 1]);
  };

  const previous = () => {
    const index = idList.indexOf(ebookId);
    if (index === 0) setEbookId(idList[idList.length - 1]);
    else setEbookId(idList[index - 1]);
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
        <Text>Back</Text>
      </TouchableOpacity>
      {data?.data.is_bought ? (
        <TouchableOpacity
          style={[styles.saveBtn, {top: top + 35}]}
          onPress={() => {
            toggleSave(data?.data.id, refetch, setLoadingSave);
          }}>
          {loadingSave ? (
            <Loading size={22} color="black" />
          ) : data?.data.is_saved ? (
            <Animated.Text style={{opacity: opacity}}>Saved</Animated.Text>
          ) : (
            <Animated.Text style={{opacity: opacity}}>Save</Animated.Text>
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
              display:
                idList.length > 2 || idType === 'Ebooks' ? 'flex' : 'none',
            },
          ]}
          onPress={previous}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <Animated.Image
          src={data?.data.image}
          style={[styles.image, {height: imageHeight}]}
          resizeMode={'contain'}
        />
        <TouchableOpacity
          style={[
            styles.nextBtn,
            {
              display:
                idList.length > 2 || idType === 'Ebooks' ? 'flex' : 'none',
            },
          ]}
          onPress={next}>
          <Text>Next</Text>
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
        {data?.data.title.slice(0, 18)}
        {data?.data.title.length > 18 ? '...' : ''}
      </Animated.Text>
      {type === 'Ebook' ? (
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
            disabled={!data?.data.is_bought}
            style={{
              ...styles.readBtn,
              opacity: !data?.data.is_bought ? 0.5 : 1,
            }}>
            <Text
              style={{
                fontWeight: '900',
                fontSize: 12,
                position: 'absolute',
                top: -16,
              }}>
              Read
            </Text>
          </TouchableOpacity>
        </View>
      ) : type === 'Audio Book' ? (
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
            disabled={!data?.data.is_bought}
            style={{
              ...styles.readBtn,
              opacity: !data?.data.is_bought ? 0.5 : 1,
            }}
            onPress={() => {
              setChapter([
                {name: data?.data.title, playlist: data?.data.playlist},
              ]);
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
          </TouchableOpacity>
        </View>
      ) : type === 'Explanation Audio' ? (
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
            disabled={!data?.data.is_bought}
            style={{
              ...styles.readBtn,
              opacity: !data?.data.is_bought ? 0.5 : 1,
            }}
            onPress={() => {
              setChapter(data?.data.chapters);
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
            disabled={!data?.data.is_bought}
            style={{
              ...styles.readBtn,
              opacity: !data?.data.is_bought ? 0.5 : 1,
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
    backgroundColor: '#4f371f',
    borderRadius: 10,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 35,
    zIndex: 10,
    opacity: 0.85,
  },
  nextBtn: {
    position: 'absolute',
    right: -45,
    backgroundColor: '#4f371f',
    borderRadius: 10,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 35,
    zIndex: 10,
    opacity: 0.85,
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
    color: '#552f6e',
  },
  readBtn: {
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
