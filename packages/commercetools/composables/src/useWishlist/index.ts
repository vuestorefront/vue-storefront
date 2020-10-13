/* istanbul ignore file */
// import {
//   getSettings,
//   isTokenUserSession,
//   CustomQueryFn
// } from '@vue-storefront/commercetools-api';
import { useWishlistFactory, UseWishlistFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { ProductVariant, LineItem } from './../types/GraphQL';
// import loadCurrentWishlist from './currentWishlist';

type Wishlist = {};

export const wishlist: Ref<Wishlist> = ref(null);

// @todo: implement wishlist
// https://github.com/DivanteLtd/vue-storefront/issues/4420

// const getCurrentWishlist = async (currentWishlist) => {
//   if (!currentWishlist) {
//     return loadCurrentWishlist();
//   }

//   return currentWishlist;
// };

const params: UseWishlistFactoryParams<Wishlist, LineItem, ProductVariant> = {
  loadWishlist: async () => {
    // const settings = getSettings();
    // if (!isTokenUserSession(settings.currentToken)) {
    //   return null;
    // }

    // return  ;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToWishlist: async ({ currentWishlist, product }) => {
    // const loadedWishlist = await getCurrentWishlist(currentWishlist);
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

const {setWishlist, useWishlist } = useWishlistFactory<Wishlist, LineItem, ProductVariant>(params);

export { setWishlist, useWishlist};
