import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Loading from '../Loading';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {toggleSave} from '../../utils/productUtils';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/color';

const BlogHeader = ({
  isSaved,
  refetch,
  id,
  loadingSave,
  setLoadingSave,
}: {
  isSaved: boolean;
  refetch: any;
  id: string;
  loadingSave: boolean;
  setLoadingSave: any;
}) => {
  const navigate = useNavigation();

  const {top} = useSafeAreaInsets();

  const handleSave = async () => {
    const response = await toggleSave(id, refetch, setLoadingSave);

    if (response?.status === 200) {
      Toast.show({type: 'success', text1: response.data.message});
    } else if (response?.status === 400) {
      Toast.show({type: 'error', text1: 'You need an account!'});
    }
  };

  return (
    <View style={[style.container, {height: 60 + top}]}>
      <TouchableOpacity style={style.backBtn} onPress={() => navigate.goBack()}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={style.saveBtn} onPress={handleSave}>
        {loadingSave ? (
          <Loading size={10} color="black" />
        ) : isSaved ? (
          <FontAwesome name="bookmark" size={24} color={colors.green} />
        ) : (
          <FontAwesome name="bookmark-o" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    padding: 10,
    backgroundColor: '#b088ba',
    width: '100%',
  },
  backBtn: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: 16,
    bottom: 5,
    padding: 10,
  },
  saveBtn: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: 16,
    bottom: 5,
    padding: 10,
  },
});

export default BlogHeader;
