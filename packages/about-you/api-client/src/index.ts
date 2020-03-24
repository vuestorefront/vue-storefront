/* istanbul ignore file */

import { BapiClient } from '@aboutyou/backbone';
import { SetupConfig } from './types';
import getProductApi from './api/getProduct';
import getCategoryApi from './api/getCategory';
import addToCartApi from './api/addToCart';
import removeFromCartApi from './api/removeFromCart';
import clearCartApi from './api/clearCart';
import placeOrderApi from './api/placeOrder';
import getUserApi from './api/getUser';
import addCouponApi from './api/addCoupon';
import removeCouponApi from './api/removeCoupon';

let apiClient: BapiClient = null;

let methods = {
  getProduct: getProductApi,
  getCategory: getCategoryApi,
  addToCart: addToCartApi,
  removeFromCart: removeFromCartApi,
  clearCart: clearCartApi,
  placeOrder: placeOrderApi,
  getUser: getUserApi,
  addCoupon: addCouponApi,
  removeCoupon: removeCouponApi
};

// TODO:: TEST THIS!!
function override(overrides) {
  methods = { ...methods,
    ...overrides };
}

// TODO:: TEST THIS!!
function setup(setupConfig: SetupConfig) {
  apiClient = new BapiClient(setupConfig);
  return apiClient;
}

/** just because you can't simply do "export x as y..." */
const getProduct = methods.getProduct;
const getCategory = methods.getCategory;
const addToCart = methods.addToCart;
const removeFromCart = methods.removeFromCart;
const clearCart = methods.clearCart;
const placeOrder = methods.placeOrder;
const getUser = methods.getUser;
const addCoupon = methods.addCoupon;
const removeCoupon = methods.removeCoupon;

export {
  getProduct,
  getCategory,
  addToCart,
  removeFromCart,
  clearCart,
  placeOrder,
  getUser,
  addCoupon,
  removeCoupon,
  override,
  setup,
  apiClient
};

