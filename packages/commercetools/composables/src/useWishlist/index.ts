/* istanbul ignore file */
import {
  addToWishlist,
  removeFromWishlist,
  getSettings,
  isTokenUserSession
} from '@vue-storefront/commercetools-api';
import { useWishlistFactory, UseWishlistFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { ProductVariant, LineItem } from './../types/GraphQL';
import loadCurrentWishlist from './currentWishlist';

type Wishlist = {};

export const wishlist: Ref<Wishlist> = ref(null);

// @todo: implement wishlist
// https://github.com/DivanteLtd/vue-storefront/issues/4420

const getWishlistItemByProduct = ({ currentWishlist, product }) => {
  return currentWishlist.items.find((item: any) => item.product.id === product.id);
};

const params: UseWishlistFactoryParams<Wishlist, LineItem, ProductVariant> = {
  loadWishlist: async (CustomQueryFn?: any) => {
    const settings = getSettings();

    if (!isTokenUserSession(settings.currentToken)) {
      return null;
    }

    return await loadCurrentWishlist(CustomQueryFn);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToWishlist: async ({ currentWishlist, product }) => {
    const { data } = await addToWishlist(currentWishlist, product);
    return data.wishlist;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromWishlist: async ({ currentWishlist, product }) => {
    const { data } = await removeFromWishlist(currentWishlist, product);
    return data.wishlist;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearWishlist: async ({ currentWishlist }) => {
    return currentWishlist;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnWishlist: ({ currentWishlist, product }) => {
    return Boolean(currentWishlist && getWishlistItemByProduct({ currentWishlist, product }));
  }
};

const {setWishlist, useWishlist } = useWishlistFactory<Wishlist, LineItem, ProductVariant>(params);

export { setWishlist, useWishlist};
