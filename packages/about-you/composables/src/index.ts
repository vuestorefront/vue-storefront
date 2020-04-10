/* istanbul ignore file */
import useCart from './composables/useCart';
import useCategory from './composables/useCategory';
import useCheckout from './composables/useCheckout';
import useLocale from './composables/useLocale';
import useProduct from './composables/useProduct';
import useUser from './composables/useUser';
import useUserOrders from './composables/useUserOrders';
import useWishlist from './composables/useWishlist';
import { cartGetters, userGetters, categoryGetters, productGetters, checkoutGetters, orderGetters } from './composables/getters/';

export {
  cartGetters,
  categoryGetters,
  checkoutGetters,
  productGetters,
  orderGetters,
  useCart,
  useCategory,
  useCheckout,
  useLocale,
  useProduct,
  useUser,
  useUserOrders,
  useWishlist,
  userGetters
};

