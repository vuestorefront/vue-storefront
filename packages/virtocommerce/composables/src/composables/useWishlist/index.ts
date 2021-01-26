/* istanbul ignore file */
import { useWishlistFactory, UseWishlistFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { Wishlist, WishlistProduct, Product } from '../../types';

export const wishlist: Ref<Wishlist> = ref(null);

const params: UseWishlistFactoryParams<Wishlist, WishlistProduct, Product> = {
  load: async () => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async ({ currentWishlist, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async ({ currentWishlist, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async ({ currentWishlist }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnWishlist: ({ currentWishlist }) => {
    return false;
  }
};

export default useWishlistFactory<Wishlist, WishlistProduct, Product>(params);
