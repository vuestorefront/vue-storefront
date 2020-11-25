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
import { isTokenUserSession } from './helpers/token/index';
import { apiClientFactory } from '@vue-storefront/core';
import { Config } from './types/setup';

const defaultSettings = {
  locale: 'en',
  acceptLanguage: ['en'],
  auth: {
    onTokenChange: () => {}
  },
  cookies: {
    currencyCookieName: 'vsf-currency',
    countryCookieName: 'vsf-country',
    localeCookieName: 'vsf-locale'
  }
};

const onSetup = (settings: Config): { config: Config; client: ApolloClient<any> } => {
  const languageMap = settings.languageMap || {};
  const acceptLanguage = settings.acceptLanguage || defaultSettings.acceptLanguage;
  const locale = settings.locale || defaultSettings.locale;

  const config = {
    ...defaultSettings,
    ...settings,
    languageMap,
    acceptLanguage: languageMap[locale] || acceptLanguage,
    auth: settings.auth || defaultSettings.auth
  } as any as Config;

  const client = settings.client || new ApolloClient({
    link: createCommerceToolsLink(config),
    cache: new InMemoryCache(),
    ...settings.customOptions
  });

  return {
    config,
    client
  };
};

const { createApiClient } = apiClientFactory<Config, any>({
  tag: 'ct',
  onSetup,
  api: {
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
    customerUpdateMe,
    isTokenUserSession
  }
});

export {
  createApiClient,
  createAccessToken
};

export * from './fragments';
export * from './types/Api';
export * from './types/GraphQL';
export * from './types/setup';
export * from './helpers/token';
export * from './helpers/queries';
export * as cartActions from './helpers/cart/actions';
