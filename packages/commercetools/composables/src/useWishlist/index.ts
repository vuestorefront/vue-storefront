/* istanbul ignore file */

import { useWishlistFactory, UseWishlistFactoryParams, Context } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { ProductVariant, LineItem } from './../types/GraphQL';

type Wishlist = {};

export const wishlist: Ref<Wishlist> = ref(null);

// @todo: implement wishlist
// https://github.com/DivanteLtd/vue-storefront/issues/4420

const params: UseWishlistFactoryParams<Wishlist, LineItem, ProductVariant> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadWishlist: async (context: Context) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToWishlist: async (context: Context, { currentWishlist, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromWishlist: async (context: Context, { currentWishlist, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearWishlist: async (context: Context, { currentWishlist }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnWishlist: (context: Context, { currentWishlist }) => {
    return false;
  }
};

const {setWishlist, useWishlist } = useWishlistFactory<Wishlist, LineItem, ProductVariant>(params);

export { setWishlist, useWishlist};
