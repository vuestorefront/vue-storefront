import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-fetch';
import loadAccessToken from './loadAccessToken';
import { ApiConfig } from './../../types/setup';

const createCommerceToolsLink = (config: ApiConfig): ApolloLink => {
  const httpLink = createHttpLink({ uri: config.uri,
    fetch });
  const authLink = setContext(async (_, { headers }) => {
    const token = await loadAccessToken(config);
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    };
  });
  const customerLink = new ApolloLink((operation, forward) =>
    forward(operation).map((response) => {
      const { operationName, variables } = operation;

      if (!response.errors && ['customerSignMeUp', 'customerSignMeIn'].includes(operationName)) {
        const { email, password } = variables.draft;
        loadAccessToken(config, { username: email,
          password });
      }

      return response;
    }));

  return ApolloLink.from([authLink, customerLink, httpLink]);
};

export default createCommerceToolsLink;
