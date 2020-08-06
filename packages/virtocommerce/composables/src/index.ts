import { track } from '@vue-storefront/core';

import useLocale from './useLocale';
import { setCart, useCart } from './useCart';
import { setUser, useUser } from './useUser';
import { setWishlist, useWishlist} from './useWishlist';
import { userGetters, cartGetters, wishlistGetters } from './getters';

track('VSFVirtoCommerce');

export {
  useLocale,

  useCart,
  setCart,

  useUser,
  setUser,

  useWishlist,
  setWishlist,

  cartGetters,
  userGetters,
  wishlistGetters
};
