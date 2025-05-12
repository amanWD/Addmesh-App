import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Loading from '../Loading';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {toggleSave} from '../../utils/productUtils';
import {useNavigation} from '@react-navigation/native';

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

  return (
    <View style={[style.container, {height: 60 + top}]}>
      <TouchableOpacity style={style.backBtn} onPress={() => navigate.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.saveBtn}
        onPress={() => {
          toggleSave(id, refetch, setLoadingSave);
        }}>
        {loadingSave ? (
          <Loading size={10} color="black" />
        ) : isSaved ? (
          <Text>Saved</Text>
        ) : (
          <Text>Save</Text>
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
    right: 32,
    bottom: 5,
    padding: 10,
  },
});

export default BlogHeader;
