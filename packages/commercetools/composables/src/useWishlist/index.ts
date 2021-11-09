/* istanbul ignore file */

import { useWishlistFactory, UseWishlistFactoryParams, Context } from '@vue-storefront/core';
import { ProductVariant, ShoppingList, ShoppingListQueryResult } from '@vue-storefront/commercetools-api';

// @todo: implement wishlist
// https://github.com/DivanteLtd/vue-storefront/issues/4420

const useWishlistFactoryParams: UseWishlistFactoryParams<ShoppingListQueryResult, ShoppingList, ProductVariant> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    return { offset: 0, count: 0, total: 0, results: [], exists: false };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentWishlist, product }) => {
    return { offset: 0, count: 0, total: 0, results: [], exists: false };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentWishlist, product }) => {
    return { offset: 0, count: 0, total: 0, results: [], exists: false };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentWishlist }) => {
    return { offset: 0, count: 0, total: 0, results: [], exists: false };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInWishlist: (context: Context, { currentWishlist }) => {
    return false;
  }
};

const useWishlist = useWishlistFactory<ShoppingListQueryResult, ShoppingList, ProductVariant>(useWishlistFactoryParams);

export {
  useWishlist,
  useWishlistFactoryParams
};
