import getCategory from './api/category';
import getProduct from './api/product';
import { getCart, createCart, addToCart, updateProductQty, removeCart, updateCart } from './api/checkout/cart';
import getShop from './api/shop';
import getCustomer from './api/customer';
import getContent from './api/content';
import { apiClientFactory } from '@vue-storefront/core';
import Client from 'shopify-buy';

const CustomClient = require('shopify-buy/index.unoptimized.umd');
let _shopifyClient;
let _shopifyCustomClient;
let cookies = {
  cartCookieName: 'vsf-cart'
};

const { setup, getSettings } = apiClientFactory<any, any>({
  defaultSettings: {
    domain: 'vsf-next-pwa.myshopify.com',
    storefrontAccessToken: '03f21475b97c18fa05c0ab452c368af4'
  },
  onSetup: (config: any) => {
    _shopifyClient = Client.buildClient(config);
    _shopifyCustomClient = CustomClient.buildClient(config);
    cookies = config.cookies || cookies;
  }
});

const settings = getSettings();

export {
  cookies,
  getProduct,
  getCategory,
  getCart,
  createCart,
  addToCart,
  updateProductQty,
  updateCart,
  removeCart,
  getShop,
  getCustomer,
  getContent,
  _shopifyClient,
  _shopifyCustomClient,
  setup,
  settings
};
