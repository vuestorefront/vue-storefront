/* istanbul ignore file */

import useCategory from './composables/useCategory';
import useProduct from './composables/useProduct';
import { setCart, useCart } from './composables/useCart';
import useCheckout from './composables/useCheckout';
import { setUser, useUser } from './composables/useUser';
import useSearch from './composables/useSearch';
import useUserOrders from './composables/useUserOrders';
import useContent from './composables/useContent';
import { useWishlist, setWishlist } from './composables/useWishlist';

import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
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
  useUserOrders,
  useContent,
  useSearch,
  useWishlist,
  setWishlist,
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  wishlistGetters
};
