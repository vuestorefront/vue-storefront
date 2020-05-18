/* istanbul ignore file */
import { useWishlistFactory, UseWishlistFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { Wishlist, WishlistProduct, Product } from '../../types';

export const wishlist: Ref<Wishlist> = ref(null);

const params: UseWishlistFactoryParams<Wishlist, WishlistProduct, Product> = {
  loadWishlist: async () => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToWishlist: async ({ currentWishlist, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromWishlist: async ({ currentWishlist, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearWishlist: async ({ currentWishlist }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnWishlist: ({ currentWishlist }) => {
    return false;
  }
};

const {setWishlist, useWishlist } = useWishlistFactory<Wishlist, WishlistProduct, Product>(params);

export { setWishlist, useWishlist};
