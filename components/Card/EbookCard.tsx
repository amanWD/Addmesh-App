import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {EbookType} from '../../types/ProductType';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../types/NavigationType';

type NavigationProps = NativeStackNavigationProp<StackParamList>;

const EBookCard = ({
  id,
  image,
  title,
  is_bought: isBought,
  is_saved: isSaved,
}: EbookType) => {
  const {navigate} = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      onPress={() => navigate('EbookDetail', {id: id})}
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
        {isBought ? isSaved ? <Text>S</Text> : null : <Text>L</Text>}
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
    width: 185,
    height: 275,
    marginBottom: 20,
    backgroundColor: '#ae72ed',
    objectFit: 'contain',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default EBookCard;
