/* istanbul ignore file */

import useCategory from './useCategory';
import useProduct from './useProduct';
import useCart from './useCart';
import useCheckout from './useCheckout';
import useUser from './useUser';
import useLocale from './useLocale';
import useUserOrders from './useUserOrders';
import useMultistore from './useMultistore';
import useGeolocation from './useGeolocation';

import {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters,
  multistoreGetters
} from './getters';

export {
  useCategory,
  useProduct,
  useCart,
  useCheckout,
  useUser,
  useLocale,
  useMultistore,
  useGeolocation,
  useUserOrders,
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  userGetters,
  orderGetters,
  multistoreGetters
};

