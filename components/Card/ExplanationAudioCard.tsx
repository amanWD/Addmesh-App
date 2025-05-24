import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ExplanationAudioType} from '../../types/ProductType';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../types/NavigationType';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

type NavigationProps = NativeStackNavigationProp<StackParamList>;

const ExplanationAudioCard = ({
  id,
  image,
  title,
  is_bought,
  is_free,
  is_saved,
}: ExplanationAudioType) => {
  const {navigate} = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      onPress={() => navigate('ExplanationAudioDetail', {id: id})}
      style={style.container}>
      <Image src={image} style={style.image} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 2,
          margin: 2,
        }}>
        {is_bought || is_free ? (
          is_saved ? (
            <MaterialIcons name="bookmark" size={22} color="#3f8c62" />
          ) : null
        ) : (
          <Entypo name="lock" size={18} color="#9c112c" />
        )}
        <Text>
          {title.slice(0, 15)}
          {title.length > 15 ? '...' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: 185,
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
