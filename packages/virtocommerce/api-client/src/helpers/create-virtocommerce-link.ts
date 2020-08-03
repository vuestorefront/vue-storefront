import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { api } from './../index';

const createVirtoCommerceLink = (): ApolloLink => {
  const httpLink = createHttpLink({ uri: api.uri, fetch });

  const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        const parsedLocations = locations.map(({ column, line }) => `[column: ${column}, line: ${line}]`);

        if (!message.includes('Resource Owner Password Credentials Grant')) {
          console.error(`[GraphQL error]: Message: ${message}, Location: ${parsedLocations.join(', ')}, Path: ${path}`);
        }
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  return ApolloLink.from([onErrorLink, httpLink]);
};

export default createVirtoCommerceLink;
