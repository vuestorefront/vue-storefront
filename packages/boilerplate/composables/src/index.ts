/* istanbul ignore file */

import useCategory from './composables/useCategory';
import useProduct from './composables/useProduct';
import { setCart, useCart } from './composables/useCart';
import useCheckout from './composables/useCheckout';
import { useReview } from './composables/useReview';
import { setUser, useUser } from './composables/useUser';
import useUserOrders from './composables/useUserOrders';
import useContent from './composables/useContent';
import { useWishlist, setWishlist } from './composables/useWishlist';

import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  reviewGetters,
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
  useReview,
  useUser,
  setUser,
  useUserOrders,
  useContent,
  useWishlist,
  setWishlist,
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  reviewGetters,
  userGetters,
  orderGetters,
  wishlistGetters
};
