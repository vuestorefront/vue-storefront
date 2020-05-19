/* istanbul ignore file */
import { useCart, setCart } from './composables/useCart';
import { useWishlist, setWishlist } from './composables/useWishlist';
import useCategory from './composables/useCategory';
import useCheckout from './composables/useCheckout';
import useLocale from './composables/useLocale';
import useProduct from './composables/useProduct';
import { useUser, setUser } from './composables/useUser';
import useUserOrders from './composables/useUserOrders';
import {
  cartGetters,
  userGetters,
  categoryGetters,
  productGetters,
  checkoutGetters,
  orderGetters,
  wishlistGetters
} from './composables/getters/';

export {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  orderGetters,
  wishlistGetters,
  useCart,
  useCategory,
  useCheckout,
  useLocale,
  useProduct,
  useUser,
  useUserOrders,
  useWishlist,
  setCart,
  setWishlist,
  setUser,
  userGetters
};

