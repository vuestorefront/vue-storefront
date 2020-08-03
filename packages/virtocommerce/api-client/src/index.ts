import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createVirtoCommerceLink from './helpers/create-virtocommerce-link';
import { ApiConfig, SetupConfig } from './types';

let apolloClient: ApolloClient<any> = null;
let api: ApiConfig = null;

const setup = <TCacheShape>(setupConfig: SetupConfig<TCacheShape>): ApolloClient<TCacheShape> => {
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
  setup
};
