/* istanbul ignore file */

import useCategory from './useCategory';
import useProduct from './useProduct';
import { setCart, useCart } from './useCart';
import useCheckout from './useCheckout';
import { setUser, useUser } from './useUser';
import useUserOrders from './useUserOrders';
import useUserShipping from './useUserShipping';
import useUserBilling from './useUserBilling';
import { setWishlist, useWishlist } from './useWishlist';
import { track } from '@vue-storefront/core';

import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters,
  wishlistGetters
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
  useUserShipping,
  useUserBilling,
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters,
  wishlistGetters
};

