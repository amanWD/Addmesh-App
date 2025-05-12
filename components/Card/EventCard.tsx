import {View, Image, StyleSheet, Text} from 'react-native';
import {EventType} from '../../types/ProductType';

const ExplanationAudioCard = ({
  id,
  image,
  title,
  is_bought,
  is_saved,
}: EventType) => {
  return (
    <View style={style.container}>
      <Image src={image} style={style.image} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 2,
          margin: 2,
        }}>
        {is_bought ? is_saved ? <Text>S</Text> : null : <Text>L</Text>}
        <Text>
          {title.slice(0, 18)}
          {title.length > 18 ? '...' : ''}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: 250,
    height: 185,
    marginBottom: 20,
    backgroundColor: '#ae72ed',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ExplanationAudioCard;
