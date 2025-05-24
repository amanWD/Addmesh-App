import {useNavigation} from '@react-navigation/native';
import {CartItemCard} from '../components/Card/CartItemCard';
import {ItemType, useCartStore} from '../hooks/useCartStore';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RootNavigationParamList} from '../types/NavigationType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<RootNavigationParamList>;

export const Cart = () => {
  const {cart, clearCart} = useCartStore();

  const {navigate} = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <ScrollView style={{width: '100%'}}>
        <View style={styles.cartContainer}>
          {cart.map((item: ItemType, index: number) => {
            return <CartItemCard {...item} key={index} />;
          })}
        </View>
        <View
          style={{
            ...styles.btnContainer,
            display: cart.length > 0 ? 'flex' : 'none',
          }}>
          <TouchableOpacity
            style={styles.checkOutBtn}
            onPress={() =>
              navigate('WebViewPage', {
                uri: 'https://stage.addmeshbook.com/Cart/Checkout',
              })
            }>
            <Text style={{color: 'white', fontWeight: 600}}>Check Out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearCart} style={styles.clearCartBtn}>
            <Text style={{color: '#d44242', fontWeight: 600}}>Clear Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbccd0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    margin: 28,
  },
  cartContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  cartBox: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 200,
    width: 200,
  },
  btnContainer: {
    marginTop: 48,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  checkOutBtn: {
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'green',
    padding: 11,
    width: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  clearCartBtn: {
    borderWidth: 2,
    borderColor: '#d44242',
    padding: 11,
    width: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
