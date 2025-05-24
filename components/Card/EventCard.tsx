import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {EbookType} from '../../types/ProductType';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../types/NavigationType';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

type NavigationProps = NativeStackNavigationProp<StackParamList>;

const EventCard = ({
  id,
  image,
  title,
  is_bought: isBought,
  is_saved: isSaved,
}: EbookType) => {
  const {navigate} = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      onPress={() => navigate('EventDetail', {id: id})}
      style={style.container}>
      <Image src={image} style={style.image} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          margin: 2,
        }}>
        {isBought ? (
          isSaved ? (
            <MaterialIcons name="bookmark" size={22} color="#3f8c62" />
          ) : null
        ) : (
          <Entypo name="lock" size={18} color="#9c112c" />
        )}
        <Text>
          {title.slice(0, 18)}
          {title.length > 18 ? '...' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: 330,
    height: 185,
    marginBottom: 20,
    backgroundColor: '#ae72ed',
    objectFit: 'contain',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default EventCard;
