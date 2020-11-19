import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-fetch';
import createAccessToken from './../createAccessToken';
import { onError } from 'apollo-link-error';
import { Config } from './../../types/setup';

const restrictedOperations = [
  'getMe',
  'createCart'
];

const createCommerceToolsLink = (settings: Config): ApolloLink => {
  const { api, currentToken, auth } = settings;
  let tokenCopy: any = currentToken;

  const createCtLink = () => {
    const httpLink = createHttpLink({ uri: api.uri, fetch });
    const authLink = setContext(async (req, { headers }) => {

      tokenCopy = await createAccessToken(settings, {
        currentToken: tokenCopy,
        requireUserSession: restrictedOperations.includes(req.operationName)
      });

      auth.onTokenChange(tokenCopy);

      return {
        headers: {
          ...headers,
          authorization: `Bearer ${tokenCopy.access_token}`
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

  return createCtLink();
};

export default createCommerceToolsLink;
