import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ItemType, useCartStore} from '../../hooks/useCartStore';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../types/NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<StackParamList>;

export const CartItemCard = (item: ItemType) => {
  const {removeItem} = useCartStore();

  const {navigate} = useNavigation<NavigationProps>();

  return (
    <View style={style.container}>
      <TouchableOpacity
        onPress={() =>
          navigate(
            item.type === 'ebook'
              ? 'EbookDetail'
              : item.type === 'audio book'
              ? 'AudioBookDetail'
              : item.type === 'explanation audio'
              ? 'ExplanationAudioDetail'
              : 'EventDetail',
            {id: item.id},
          )
        }>
        <Image src={item.image} style={style.image} />
      </TouchableOpacity>
      <View
        style={{
          width: 130,
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
        }}>
        <Text>
          {item.price_in_etb} ብር / ${item.price_in_usd}
        </Text>
        <Text>
          {item.title.slice(0, 18)}
          {item.title.length > 18 ? '...' : null}
        </Text>
        <Text>{item.type.toUpperCase()}</Text>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  image: {
    width: 130,
    height: 130,
    objectFit: 'contain',
  },
});
