/* istanbul ignore file */

import useCategory from './useCategory';
import useProduct from './useProduct';
import { setCart, useCart } from './useCart';
import useCheckout from './useCheckout';
import { setUser, useUser } from './useUser';
import useUserOrders from './useUserOrders';
import { setWishlist, useWishlist } from './useWishlist';
import { useReview, reviewGetters } from './useReview/mock';
import useFacet from './useFacet';
import { track } from '@vue-storefront/core';

import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters,
  wishlistGetters,
  facetGetters
} from './getters';

track('VSFCommercetools');

export {
  useCategory,
  useProduct,
  useCart,
  setCart,
  useCheckout,
  useUser,
  setUser,
  useUserOrders,
  useWishlist,
  setWishlist,
  useReview,
  useFacet,
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  reviewGetters,
  userGetters,
  orderGetters,
  wishlistGetters,
  facetGetters
};

