import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createCommerceToolsLink from './helpers/createCommerceToolsLink';
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
import { apiClientFactory } from '@vue-storefront/core';
import { Config, ConfigurableConfig } from './types/setup';
export * from './types/Api';
export * from './types/setup';
export * as cartActions from './helpers/cart/actions';
export * from './helpers/token';

let apolloClient: ApolloClient<any> = null;

const onSetup = (config: Config) => {
  config.languageMap = config.languageMap || {};
  config.acceptLanguage = config.languageMap[config.locale] || config.acceptLanguage;
  apolloClient = new ApolloClient({
    link: createCommerceToolsLink(),
    cache: new InMemoryCache(),
    ...config.customOptions
  });
};

const { setup, update, getSettings } = apiClientFactory<Config, ConfigurableConfig>({
  onSetup,
  defaultSettings: {
    locale: 'en',
    acceptLanguage: ['en'],
    cookies: {
      currencyCookieName: 'vsf-currency',
      countryCookieName: 'vsf-country',
      localeCookieName: 'vsf-locale'
    }
  }
});

export {
  getSettings,
  createAccessToken,
  apolloClient,
  setup,
  update,
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
