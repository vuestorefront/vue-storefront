/* istanbul ignore file */

import useCategory from './composables/useCategory';
import useProduct from './composables/useProduct';
import { setCart, useCart } from './composables/useCart';
import useCheckout from './composables/useCheckout';
import { setUser, useUser } from './composables/useUser';
import useLocale from './composables/useLocale';
import useUserOrders from './composables/useUserOrders';
import useContent from './composables/useContent';
import { useWishlist, setWishlist } from './composables/useWishlist';

import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters,
  wishlistGetters
} from './composables/getters';

export {
  useCategory,
  useProduct,
  useCart,
  setCart,
  useCheckout,
  useUser,
  setUser,
  useLocale,
  useUserOrders,
  useContent,
  useWishlist,
  setWishlist,
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters,
  wishlistGetters
};
