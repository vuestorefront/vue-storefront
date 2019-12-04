import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import fetch from 'isomorphic-fetch'
import getAccessToken from './getAccessToken'
import { ApiConfig } from '../types/setup'

const createCommerceToolsLink = (config: ApiConfig): ApolloLink => {
  let token: string = null
  const httpLink = createHttpLink({ uri: config.uri, fetch })
  const authLink = setContext(async (_, { headers }) => {
    if (!token) {
      token = await getAccessToken(config);
    }

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  return authLink.concat(httpLink)
}

export default createCommerceToolsLink
