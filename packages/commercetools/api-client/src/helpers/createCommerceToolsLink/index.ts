import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import fetch from 'isomorphic-fetch'
import getAccessToken from './../../helpers/createCommerceToolsLink/getAccessToken'
import { ApiConfig } from './../../types/setup'

const createCommerceToolsLink = (config: ApiConfig): ApolloLink => {
  const httpLink = createHttpLink({ uri: config.uri, fetch })
  const authLink = setContext(async (_, { headers }) => {
    const token = await getAccessToken(config)

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
