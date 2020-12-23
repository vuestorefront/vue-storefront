/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { Wishlist, WishlistProduct, Product } from '../types';

export const wishlist: Ref<Wishlist> = ref(null);

const params: UseWishlistFactoryParams<Wishlist, WishlistProduct, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    console.log('Mocked: loadWishlist');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentWishlist, product }) => {
    console.log('Mocked: addToWishlist');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentWishlist, product }) => {
    console.log('Mocked: removeFromWishlist');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentWishlist }) => {
    console.log('Mocked: clearWishlist');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnWishlist: (context: Context, { currentWishlist }) => {
    console.log('Mocked: isOnWishlist');
    return false;
  }
};

export default useWishlistFactory<Wishlist, WishlistProduct, Product>(params);
