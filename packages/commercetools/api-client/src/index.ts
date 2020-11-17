import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import createCart from './api/createCart';
import updateCart from './api/updateCart';
import getCart from './api/getCart';
import addToCart from './api/addToCart';
import removeFromCart from './api/removeFromCart';
import updateCartQuantity from './api/updateCartQuantity';
import getMe from './api/getMe';
import createMyOrderFromCart from './api/createMyOrderFromCart';
import getShippingMethods from './api/getShippingMethods';
import updateShippingDetails from './api/updateShippingDetails';
import customerSignMeUp from './api/customerSignMeUp';
import customerSignMeIn from './api/customerSignMeIn';
import customerSignOut from './api/customerSignOut';
import getOrders from './api/getMyOrders';
import applyCartCoupon from './api/applyCartCoupon';
import removeCartCoupon from './api/removeCartCoupon';
import customerChangeMyPassword from './api/customerChangeMyPassword';
import customerUpdateMe from './api/customerUpdateMe';
import createAccessToken from './helpers/createAccessToken';
import {
  apiClientMethodFactory,
  getSettings,
  setup,
  update
} from './configuration';

export {
  apiClientMethodFactory,
  getSettings,
  setup,
  update,
  createAccessToken,
  getProduct,
  getCategory,
  getOrders,
  createCart,
  updateCart,
  getCart,
  addToCart,
  removeFromCart,
  getMe,
  updateCartQuantity,
  createMyOrderFromCart,
  getShippingMethods,
  updateShippingDetails,
  customerSignMeUp,
  customerSignMeIn,
  customerSignOut,
  applyCartCoupon,
  removeCartCoupon,
  customerChangeMyPassword,
  customerUpdateMe
};

export * from './fragments';
export * from './types/Api';
export * from './types/GraphQL';
export * from './types/setup';
export * from './helpers/token';
export * from './helpers/queries';
export * as cartActions from './helpers/cart/actions';
