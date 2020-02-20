import { BapiClient } from '@aboutyou/backbone';
import getProductApi from './getProduct';
import getCategoryApi from './getCategory';
import addToCartApi from './addToCart';
import removeFromCartApi from './removeFromCart';
import clearCartApi from './clearCart';
import placeOrderApi from './placeOrder';
import getUserApi from './getUser';
import addCouponApi from './addCoupon';
import removeCouponApi from './removeCoupon';

let api = null;

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

function setup() {
  api = new BapiClient({
    host: 'https://boston.backbone-api.demo.aboutyou.cloud/v1/',
    auth: { username: 'aboutyou',
      password: 'OmNErAb96Y5Qn75SFhXr' },
    shopId: 121
  });
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

setup();
async function getCat() {
  const cat = await getCategory({ depth: 3 });
  console.log(JSON.stringify(cat));
}
getCat();

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
  api
};

