import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-fetch';
import createAccessToken from './../createAccessToken';
import { api, currentToken, auth } from './../../index';
import { Token, CustomerCredentials } from '../../types/setup';

const refreshToken = async (customerCredentials?: CustomerCredentials): Promise<Token> => {
  const token = await createAccessToken({ currentToken, customerCredentials });
  auth.onTokenChange(token);

  return token;
};

const createCommerceToolsLink = (): ApolloLink => {
  const httpLink = createHttpLink({ uri: api.uri, fetch });
  const authLink = setContext(async (_, { headers }) => {
    const token = await refreshToken();

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token.access_token}`
      }
    };
  });
  const customerLink = new ApolloLink((operation, forward) =>
    forward(operation).map((response) => {
      const { operationName, variables } = operation;

      if (!response.errors && ['customerSignMeUp', 'customerSignMeIn'].includes(operationName)) {
        const { email, password } = variables.draft;
        refreshToken({ username: email, password });
      }

      return response;
    }));

  return ApolloLink.from([authLink, customerLink, httpLink]);
};

export default createCommerceToolsLink;
