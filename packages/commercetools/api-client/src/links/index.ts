import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Config } from '../types/setup';
import { createLinks } from './createLinks';

/**
 * Creates new Apollo GraphQL client.
 */
export function createApolloClient(configuration: Config) {
  const clientConfiguration = {
    cache: new InMemoryCache(),
    ...configuration.customOptions
  };

  if (!clientConfiguration.link) {
    clientConfiguration.link = createLinks(configuration);
  }

  return new ApolloClient(clientConfiguration);
}
