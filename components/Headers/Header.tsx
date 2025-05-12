import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../styles/color';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationParamList} from '../../types/NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<RootNavigationParamList>;

const Header = () => {
  const {top} = useSafeAreaInsets();

  const {navigate} = useNavigation<NavigationProps>();

  return (
    <View style={[styles.container, {height: 70 + top}]}>
      <TouchableOpacity style={styles.logo}>
        <Image
          source={require('../../assets/images/AddmeshLogo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.rightLink}>
        <TouchableOpacity>
          <Text>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Account')}>
          <Text>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('EpubReader')}>
          <Text>Search</Text>
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
    columnGap: 20,
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
