import getProductApi from './getProduct';
import getCategoryApi from './getCategory';
import addToCartApi from './addToCart';
import removeFromCartApi from './removeFromCart';
import clearCartApi from './clearCart';
import placeOrderApi from './placeOrder';
import getUserApi from './getUser';
import addCouponApi from './addCoupon';
import removeCouponApi from './removeCoupon';

let config = {};

let methods = {
  getProductApi,
  getCategoryApi,
  addToCartApi,
  removeFromCartApi,
  clearCartApi,
  placeOrderApi,
  getUserApi,
  addCouponApi,
  removeCouponApi
};

function override(overrides) {
  methods = { ...methods,
    ...overrides };
}

function setup(newConfig) {
  config = { ...config,
    ...newConfig };
}

/** just because you can't simply do "export x as y..." */
const getProduct = methods.getProductApi;
const getCategory = methods.getCategoryApi;
const addToCart = methods.addToCartApi;
const removeFromCart = methods.removeFromCartApi;
const clearCart = methods.clearCartApi;
const placeOrder = methods.placeOrderApi;
const getUser = methods.getUserApi;
const addCoupon = methods.addCouponApi;
const removeCoupon = methods.removeCouponApi;

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
  setup
};
