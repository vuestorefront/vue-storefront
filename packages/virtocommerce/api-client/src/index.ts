import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createVirtoCommerceLink from './helpers/create-virtocommerce-link';
import { ApiConfig, SetupConfig } from './types';

import getMe from './api/getMe';

let apolloClient: ApolloClient<any> = null;
let api: ApiConfig = null;

const setup = <TCacheShape>(setupConfig: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
  console.warn('setup started');
  console.warn(`api: ${JSON.stringify(setupConfig)}`);
  api = setupConfig.api || api;

  if (setupConfig.api) {
    apolloClient = new ApolloClient({
      link: createVirtoCommerceLink(),
      cache: new InMemoryCache(),
      ...setupConfig.customOptions
    });
  }

  return apolloClient;
};

export {
  api,
  apolloClient,
  setup,
  getMe
};
