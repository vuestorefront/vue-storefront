/* istanbul ignore file */

import useCategory from './composables/useCategory';
import useProduct from './composables/useProduct';
import { setCart, useCart } from './composables/useCart';
import useCheckout from './composables/useCheckout';
import { useReview, reviewGetters } from './composables/useReview';
import { setUser, useUser } from './composables/useUser';
import useUserOrders from './composables/useUserOrders';
import useContent from './composables/useContent';
import useFacet from './composables/useFacet';
import { useWishlist, setWishlist } from './composables/useWishlist';
import useUserShipping from './composables/useUserShipping';
import useUserBilling from './composables/useUserBilling';

import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  facetGetters,
  productGetters,
  userGetters,
  userShippingGetters,
  userBillingGetters,
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
  useFacet,
  useWishlist,
  useUserShipping,
  useUserBilling,
  setWishlist,
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  facetGetters,
  reviewGetters,
  userGetters,
  orderGetters,
  wishlistGetters,
  userShippingGetters,
  userBillingGetters
};
