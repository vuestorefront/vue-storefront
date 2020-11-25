/* istanbul ignore file */

import useCategory from './useCategory';
import useProduct from './useProduct';
import { useCart } from './useCart';
import useCheckout from './useCheckout';
import { useUser } from './useUser';
import useUserOrders from './useUserOrders';
import { setWishlist, useWishlist } from './useWishlist';
import { useReview, reviewGetters } from './useReview';
import useFacet from './useFacet';
import { track } from '@vue-storefront/core';
import useUserShipping from './useUserShipping';
import useUserBilling from './useUserBilling';

import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  userShippingGetters,
  userBillingGetters,
  orderGetters,
  wishlistGetters,
  facetGetters
} from './getters';

track('VSFCommercetools');

export {
  useCategory,
  useProduct,
  useCart,
  useCheckout,
  useUser,
  useUserOrders,
  useUserBilling,
  useWishlist,
  useUserShipping,
  setWishlist,
  useReview,
  useFacet,
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  reviewGetters,
  userGetters,
  userShippingGetters,
  userBillingGetters,
  orderGetters,
  wishlistGetters,
  facetGetters
};

