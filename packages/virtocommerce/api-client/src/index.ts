import getProduct from './api/getProduct';
import searchProducts from './api/searchProducts';
import searchCategories from './api/searchCategories';
import getCategory from './api/getCategory';
import getCart from './api/getCart';
import getMe  from './api/getMe';
import clearCart from './api/clearCart';
import signIn from './api/signIn';
import getMyOrders from './api/getMyOrders';
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
import ClientOAuth2 from "client-oauth2";
import { setContext } from 'apollo-link-context';
import { VC_USER_ID, VC_AUTH_TOKEN, generateUUID } from './utils'

// let xApiClient: ApolloClient<NormalizedCacheObject> | null = null;
// let vcAuthClient: ClientOAuth2 | null = null;

const onSetup = (config: Config ): { config: Config; client: ApolloClient<NormalizedCacheObject>, authClient: ClientOAuth2 } => {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = config.getAccessToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(
      createHttpLink({ uri: `${config.api.uri}/graphql`, fetch })
    ),
  });
  const authClient = new ClientOAuth2({
    accessTokenUri: `${config.api.uri}/connect/token`,
    scopes: [''],
  });

  return {
    config,
    client,
    authClient
  };
};

const { createApiClient } = apiClientFactory<Config, any>({
  tag: 'vc',
  onSetup,
  api: {
    getProduct,
    getMe,
    getMyOrders,
    signIn,
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
    removeFromCart
  }
});

export {
  createApiClient,
  VC_USER_ID, 
  VC_AUTH_TOKEN,
  generateUUID
};


export * from './graphql/types';