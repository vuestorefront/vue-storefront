import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-fetch';
import createAccessToken from './../createAccessToken';
import { getSettings } from './../../index';
import { onError } from 'apollo-link-error';

const createCommerceToolsLink = (): ApolloLink => {
  const { api, currentToken, auth } = getSettings();
  const httpLink = createHttpLink({ uri: api.uri, fetch });
  const authLink = setContext(async (_, { headers }) => {
    const token = await createAccessToken({ currentToken });
    auth.onTokenChange(token);

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token.access_token}`
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

export default createCommerceToolsLink;
