import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
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

const settings = getSettings();

export {
  getProduct,
  getCategory,
  setup,
  update,
  settings,
  xApiClient
};

export * from './graphql/types';