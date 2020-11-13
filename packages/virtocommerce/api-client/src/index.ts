import getProduct from './api/getProduct';
import searchProducts from './api/searchProducts';
import searchCategories from './api/searchCategories';
import getCategory from './api/getCategory';
import getCart from './api/getCart';
import clearCart from './api/clearCart';
import updateCartItemQuantity from './api/updateQuantity';
import removeFromCart from './api/removeFromCart';
import addToCart from './api/addToCart';
import placeOrder from './api/placeOrder';
import addOrUpdateCartShipment from './api/addOrUpdateCartShipment';
import addOrUpdateCartPayment from './api/addOrUpdateCartPayment';
import { apiClientFactory } from '@vue-storefront/core';
import { Config } from './types';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache  } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

let xApiClient: ApolloClient<NormalizedCacheObject> | null = null;


const { setup, update, getSettings } = apiClientFactory<Config, any>({
  defaultSettings: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetup: (config: Config) => {    
    xApiClient = new ApolloClient({ cache: new InMemoryCache(), link: createHttpLink( { uri: config.api.uri, fetch } )});
  }
});

export {
  getProduct,
  searchProducts,
  searchCategories,
  getCategory,
  getCart,
  addOrUpdateCartShipment,
  addOrUpdateCartPayment,
  updateCartItemQuantity,
  clearCart,
  addToCart,
  placeOrder,
  removeFromCart,
  setup,
  update,
  getSettings,
  xApiClient  
};

export * from './graphql/types';