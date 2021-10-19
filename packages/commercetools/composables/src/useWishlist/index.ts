/* istanbul ignore file */

import { useWishlistFactory, UseWishlistFactoryParams, Context } from '@vue-storefront/core';
import { ProductVariant, LineItem } from './../types/GraphQL';

export type Wishlist = any;

// @todo: implement wishlist
// https://github.com/DivanteLtd/vue-storefront/issues/4420

/**
 * @remarks References:
 * {@link LineItem}, {@link ProductVariant}
 */
const useWishlistFactoryParams: UseWishlistFactoryParams<Wishlist, LineItem, ProductVariant> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentWishlist, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentWishlist, product }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentWishlist }) => {
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInWishlist: (context: Context, { currentWishlist }) => {
    return false;
  }
};

/**
 * @remarks References:
 * {@link LineItem}, {@link ProductVariant}
 */
const useWishlist = useWishlistFactory<Wishlist, LineItem, ProductVariant>(useWishlistFactoryParams);

export {
  useWishlist,
  useWishlistFactoryParams
};
