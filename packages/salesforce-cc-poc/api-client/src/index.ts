import { getProductDetails, getProductList } from './api/getProduct';
import getCategory from './api/getCategory';
import { apiClientFactory } from '@vue-storefront/core';
import { ApiClientMethods, ApiClientSettings } from './types';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createSFCCGraphQLLink from './helpers/createSFCCGraphQLLink';

let apolloClient: ApolloClient<any> = null;

const { setup, override, getSettings } = apiClientFactory<ApiClientMethods, ApiClientSettings>({
  defaultSettings: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetup: (config: any) => {
    if (config.api) {
      apolloClient = new ApolloClient({
        link: createSFCCGraphQLLink(config.api.uri),
        cache: new InMemoryCache(),
        ...config.customOptions
      });
    } else throw new Error('No valid config.api URL set for the sfcc-graphql-bridge instance');

    return apolloClient;
  }
});

const settings = getSettings();

export {
  getProductList,
  getProductDetails,
  getCategory,
  override,
  setup,
  settings,
  apolloClient
};
