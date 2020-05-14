/* istanbul ignore file */

import useCategory from './useCategory';
import useProduct from './useProduct';
import { setCart, useCart } from './useCart';
import useCheckout from './useCheckout';
import { setUser, useUser } from './useUser';
import useLocale from './useLocale';
import useUserOrders from './useUserOrders';
import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters
} from './getters';

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
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters
};

