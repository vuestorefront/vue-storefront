import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-fetch';
import createAccessToken from './../createAccessToken';
import { api, currentToken, auth } from './../../index';

const createCommerceToolsLink = (): ApolloLink => {
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

  return ApolloLink.from([authLink, httpLink]);
};

export default createCommerceToolsLink;
