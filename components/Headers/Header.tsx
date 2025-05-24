import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../styles/color';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationParamList} from '../../types/NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

type NavigationProps = NativeStackNavigationProp<RootNavigationParamList>;

const Header = () => {
  const {top} = useSafeAreaInsets();

  const {navigate} = useNavigation<any>();

  return (
    <View style={[styles.container, {height: 70 + top}]}>
      <TouchableOpacity style={styles.logo} onPress={() => navigate('Home')}>
        <Image
          source={require('../../assets/images/AddmeshLogo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.rightLink}>
        <TouchableOpacity>
          <Entypo name="help-with-circle" size={24} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Cart')}>
          <FontAwesome
            name="shopping-cart"
            size={24}
            color={colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Account')}>
          <MaterialIcons
            name="account-circle"
            size={26}
            color={colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Search')}>
          <AntDesign name="search1" size={22} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    padding: 10,
    backgroundColor: colors.primary,
    width: '100%',
    height: 120,
  },
  logo: {
    height: 65,
    width: 65,
    position: 'absolute',
    bottom: 5,
    left: 10,
  },
  rightLink: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 25,
    right: 20,
    bottom: 15,
  },
  cartCountText: {
    position: 'absolute',
    top: -15,
    left: 18,
    color: '#edcef5',
    fontSize: 16,
  },
  accountLetterContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    aspectRatio: 1,
    backgroundColor: '#edcef5',
    borderRadius: '50%',
  },
  accountLetter: {
    fontSize: 18,
    color: '#592685',
    fontWeight: 'bold',
  },
});

export default Header;
