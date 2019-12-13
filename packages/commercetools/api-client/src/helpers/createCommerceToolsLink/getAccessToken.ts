import SdkAuth from '@commercetools/sdk-auth'
import { ApiConfig } from './../../types/setup'
import { storeToken, getToken } from './../../helpers/createCommerceToolsLink/tokenCache'
import { Token } from './../../types/setup'

const isTokenExpired = (token: Token): boolean => Date.now() > token.expires_at

const fetchAccessToken = async (config: ApiConfig): Promise<Token> => {
  const authClient = new SdkAuth({
    host: config.authHost,
    projectKey: config.projectKey,
    disableRefreshToken: false,
    credentials: {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    },
    scopes: config.scopes,
  })

  return authClient.clientCredentialsFlow()
}

const getAccessToken = async (config: ApiConfig): Promise<string> => {
  const currentToken = getToken()

  if (currentToken && !isTokenExpired(currentToken)) {
    return currentToken.access_token
  }

  const token = await fetchAccessToken(config)

  storeToken(token)

  return token.access_token
};

export default getAccessToken
