import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export type ItemType = {
  id: string;
  image: string;
  title: string;
  price_in_etb: number;
  price_in_usd: number;
  quantity: number;
  type: 'blog' | 'ebook' | 'audio book' | 'explanation audio' | 'event';
};

type CartType = {
  cart: ItemType[];
  addItem: (item: ItemType) => void;
  updateQuantity: (itemId: string, updateType: 'plus' | 'minus') => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartType>()(
  persist(
    set => ({
      cart: [],
      addItem(item: ItemType) {
        set(state => {
          const index = state.cart.findIndex(
            (cartItem: ItemType) => cartItem.id === item.id,
          );
          return {cart: [...state.cart, item]};
        });
      },
      updateQuantity(itemId: string, updateType: 'plus' | 'minus') {
        set(state => {
          const index = state.cart.findIndex(
            (cartItem: ItemType) => cartItem.id === itemId,
          );
          if (index >= 0) {
            state.cart[index].quantity =
              updateType === 'plus'
                ? state.cart[index].quantity + 1
                : state.cart[index].quantity - 1;
            if (state.cart[index].quantity < 1) {
              return {
                cart: state.cart.filter((item: ItemType) => item.id !== itemId),
              };
            }

            return {cart: state.cart};
          } else {
            return {cart: state.cart};
          }
        });
      },
      removeItem(itemId: string) {
        set(state => {
          const updatedCart = state.cart.filter(
            (item: ItemType) => item.id !== itemId,
          );
          return {cart: updatedCart};
        });
      },
      clearCart() {
        set(() => ({cart: []}));
      },
    }),
    {
      name: 'Cart',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
