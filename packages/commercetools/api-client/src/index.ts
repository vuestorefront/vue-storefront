import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import SdkAuth, { TokenProvider } from '@commercetools/sdk-auth';
import { createCommerceToolsConnection, isAnonymousSession, isUserSession } from './helpers/comemrcetoolsLink';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import createCart from './api/createCart';
import updateCart, { UpdateCartParams } from './api/updateCart';
import getCart from './api/getCart';
import addToCart from './api/addToCart';
import removeFromCart from './api/removeFromCart';
import updateCartQuantity from './api/updateCartQuantity';
import getMe, { GetMeParams } from './api/getMe';
import createMyOrderFromCart from './api/createMyOrderFromCart';
import getShippingMethods, { ShippingMethodData } from './api/getShippingMethods';
import updateShippingDetails from './api/updateShippingDetails';
import customerSignMeUp from './api/customerSignMeUp';
import customerSignMeIn from './api/customerSignMeIn';
import getOrders from './api/getMyOrders';
import applyCartCoupon from './api/applyCartCoupon';
import removeCartCoupon from './api/removeCartCoupon';
import customerChangeMyPassword from './api/customerChangeMyPassword';
import customerUpdateMe from './api/customerUpdateMe';
import { apiClientFactory } from '@vue-storefront/core';
import { Config } from './types/setup';
import {
  CustomQueryFn,
  CartResponse,
  CartData,
  SignInResponse,
  OrderMutationResponse,
  ChangeMyPasswordResponse,
  CartQueryResponse,
  QueryResponse
} from './types/Api';
import {
  Cart,
  ProductVariant,
  OrderMyCartCommand,
  CustomerSignMeInDraft,
  CustomerSignMeUpDraft,
  ReferenceInput,
  Address,
  LineItem,
  CategoryQueryResult,
  ProductQueryResult,
  Me,
  CartQueryInterface
} from './types/GraphQL';

export * from './fragments';

const defaultSettings = {
  locale: 'en',
  acceptLanguage: ['en'],
  auth: {
    onTokenChange: () => {},
    onTokenRead: () => '',
    onTokenRemove: () => {}
  },
  cookies: {
    currencyCookieName: 'vsf-currency',
    countryCookieName: 'vsf-country',
    localeCookieName: 'vsf-locale'
  }
};

export interface ClientInstance extends ApolloClient<any> {
  sdkAuth?: SdkAuth;
  tokenProvider?: TokenProvider;
}

const isGuest = (context) => {
  const { client, config } = context;
  const { handleIsGuest } = config;

  if (handleIsGuest) {
    return handleIsGuest(context);
  }

  if (client.tokenProvider) {
    const token = config.auth.onTokenRead();
    return !isAnonymousSession(token) && !isUserSession(token);
  }

  return false;
};

const customerSignOut = async ({ config, client }) => {
  if (config.auth.onTokenRemove) {
    config.auth.onTokenRemove();
  }

  if (client.tokenProvider) {
    client.tokenProvider.invalidateTokenInfo();
  }
};

const onSetup = (settings: Config): { config: Config; client: ClientInstance } => {
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

  if (settings.client) {
    return { client: settings.client, config };
  }

  if (settings.customOptions && settings.customOptions.link) {
    return {
      client: new ApolloClient({
        cache: new InMemoryCache(),
        ...settings.customOptions
      }),
      config
    };
  }

  const { apolloLink, sdkAuth, tokenProvider } = createCommerceToolsConnection(config);

  const client = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ...settings.customOptions
  });
  (client as ClientInstance).sdkAuth = sdkAuth;
  (client as ClientInstance).tokenProvider = tokenProvider;

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
    isGuest
  }
});

export {
  createApiClient
};

export interface ApiInstance {
  addToCart ({ id, version }: Cart, product: ProductVariant, quantity: number, customQuery?: CustomQueryFn): Promise<CartResponse>;
  applyCartCoupon (cart: Cart, discountCode: string, customQuery?: CustomQueryFn): Promise<CartResponse>;
  createCart (cartDraft?: CartData, customQueryFn?: CustomQueryFn): Promise<{ data: CartQueryInterface }>;
  createMyOrderFromCart (draft: OrderMyCartCommand, customQueryFn?: CustomQueryFn): Promise<OrderMutationResponse>;
  customerChangeMyPassword (version: any, currentPassword: string, newPassword: string): Promise<ChangeMyPasswordResponse>;
  customerSignMeIn (draft: CustomerSignMeInDraft): Promise<SignInResponse>;
  customerSignMeUp (draft: CustomerSignMeUpDraft): Promise<SignInResponse>;
  customerSignOut (): Promise<void>;
  customerUpdateMe (currentUser, updatedUserData): Promise<any>;
  getCart (cartId: string): Promise<CartQueryResponse>;
  getCategory (params, customQueryFn?: CustomQueryFn): Promise<QueryResponse<'categories', CategoryQueryResult>>;
  getMe (params?: GetMeParams, customQueryFn?: CustomQueryFn): Promise<{ data: { me: Me } }>;
  getOrders (params, customQueryFn?: CustomQueryFn): Promise<{ data: { me: Me } }>;
  getProduct (params, customQueryFn?: CustomQueryFn): Promise<QueryResponse<'products', ProductQueryResult>>;
  getShippingMethods (cartId?: string, customQueryFn?: CustomQueryFn): Promise<ShippingMethodData>;
  removeCartCoupon (cart: Cart, discountCode: ReferenceInput, customQuery?: CustomQueryFn): Promise<CartResponse>;
  removeFromCart (Cart, product: LineItem, customQuery?: CustomQueryFn): Promise<CartResponse>;
  updateCart (params: UpdateCartParams, customQueryFn?: CustomQueryFn): Promise<CartResponse>;
  updateCartQuantity (cart: Cart, product: LineItem, customQuery?: CustomQueryFn): Promise<CartResponse>;
  updateShippingDetails (cart: Cart, shippingDetails: Address, customQueryFn?: CustomQueryFn): Promise<CartResponse>;
  isGuest: () => boolean;
}

export * from './fragments';
export * from './types/Api';
export * from './types/GraphQL';
export * from './types/setup';
export * from './helpers/queries';
export * as cartActions from './helpers/cart/actions';

