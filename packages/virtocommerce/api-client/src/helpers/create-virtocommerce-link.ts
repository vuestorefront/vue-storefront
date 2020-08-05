import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { fetch as isomorphicFetch } from 'isomorphic-fetch';
import { api } from './../index';

const createVirtoCommerceLink = (): ApolloLink => {
  const httpLink = createHttpLink({
    uri: api.uri,
    fetch: isomorphicFetch
  });

  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers
      }
    };
  });

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

  return ApolloLink.from([onErrorLink, authLink, httpLink]);
};

export default createVirtoCommerceLink;
