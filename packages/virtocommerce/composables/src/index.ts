import { track } from '@vue-storefront/core';

import useLocale from './useLocale';
import { setCart, useCart } from './useCart';
import useCategory from './useCategory';
import useProduct from './useProduct';
import { setUser, useUser } from './useUser';
import { setWishlist, useWishlist} from './useWishlist';
import { cartGetters, categoryGetters, productGetters, userGetters, wishlistGetters } from './getters';

track('VSFVirtoCommerce');

export {
  useLocale,

  useCart,
  setCart,

  useCategory,

  useProduct,

  useUser,
  setUser,

  useWishlist,
  setWishlist,

  cartGetters,
  categoryGetters,
  productGetters,
  userGetters,
  wishlistGetters
};
