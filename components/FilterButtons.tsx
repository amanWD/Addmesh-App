import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useFetchStore} from '../hooks/useFetchStore';
import {useRoute} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FilterButtons = () => {
  const {changeFetchData, fetchData} = useFetchStore();

  const router = useRoute();

  useEffect(() => {
    if (router.name === 'MyShelf')
      changeFetchData('ebookAPI/products/', 'Ebooks');
  }, [router.name]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: fetchData.name === 'Ebooks' ? '#592685' : 'gray',
          },
        ]}
        onPress={() => changeFetchData('ebookAPI/products/', 'Ebooks')}>
        <FontAwesome6
          name="book"
          size={28}
          color={fetchData.name === 'Ebooks' ? '#592685' : 'gray'}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            color: fetchData.name === 'Ebooks' ? '#592685' : 'gray',
          }}>
          Ebooks
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: fetchData.name === 'Audio Books' ? '#592685' : 'gray',
          },
        ]}
        onPress={() =>
          changeFetchData('audioBookAPI/products/', 'Audio Books')
        }>
        <FontAwesome6
          name="file-audio"
          size={28}
          color={fetchData.name === 'Audio Books' ? '#592685' : 'gray'}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            color: fetchData.name === 'Audio Books' ? '#592685' : 'gray',
          }}>
          Audio Books
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor:
              fetchData.name === 'Explanation Audios' ? '#592685' : 'gray',
          },
        ]}
        onPress={() =>
          changeFetchData('explanationAudioAPI/products/', 'Explanation Audios')
        }>
        <MaterialIcons
          name="spatial-audio-off"
          size={24}
          color={fetchData.name === 'Explanation Audios' ? '#592685' : 'gray'}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            color: fetchData.name === 'Explanation Audios' ? '#592685' : 'gray',
          }}>
          Explanation Audios
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            display: router.name === 'MyShelf' ? 'none' : 'flex',
            borderColor: fetchData.name === 'Blogs' ? '#592685' : 'gray',
          },
        ]}
        onPress={() => changeFetchData('blogAPI/blogs/', 'Blogs')}>
        <FontAwesome6
          name="file-text"
          size={28}
          color={fetchData.name === 'Blogs' ? '#592685' : 'gray'}
        />
        <Text
          style={{
            fontWeight: '700',
            color: fetchData.name === 'Blogs' ? '#592685' : 'gray',
          }}>
          Blogs
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: fetchData.name === 'Events' ? '#592685' : 'gray',
          },
        ]}
        onPress={() => changeFetchData('eventAPI/', 'Events')}>
        <AntDesign
          name="notification"
          size={24}
          color={fetchData.name === 'Events' ? '#592685' : 'gray'}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            color: fetchData.name === 'Events' ? '#592685' : 'gray',
          }}>
          Events
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    alignSelf: 'center',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#592685',
    width: 100,
    height: 80,
    borderRadius: 7,
    gap: 4,
  },
});

export default FilterButtons;
