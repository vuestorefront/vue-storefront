/* istanbul ignore file */

import { useWishlistFactory, UseWishlistFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { ProductVariant, LineItem } from './../types/GraphQL';

type Wishlist = {};

export const wishlist: Ref<Wishlist> = ref(null);

// @todo: implement wishlist
// https://github.com/DivanteLtd/vue-storefront/issues/4420

const params: UseWishlistFactoryParams<Wishlist, LineItem, ProductVariant, any> = {
  // eslint-disable-next-line
  async loadWishlist(context) {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async addToWishlist({ currentWishlist, product }) {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async removeFromWishlist({ currentWishlist, product }) {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async clearWishlist({ currentWishlist }) {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnWishlist({ currentWishlist }) {
    return false;
  }
};

const {setWishlist, useWishlist } = useWishlistFactory<Wishlist, LineItem, ProductVariant, any>(params);

export { setWishlist, useWishlist};
