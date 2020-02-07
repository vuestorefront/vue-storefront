import SdkAuth from '@commercetools/sdk-auth'
import { Token, ApiConfig, CustomerCredentials } from './../../types/setup'

interface FlowOptions {
  currentToken?: Token
  customerCredentials?: CustomerCredentials
}

const createAuthClient = (config: ApiConfig): SdkAuth =>
  new SdkAuth({
    host: config.authHost,
    projectKey: config.projectKey,
    disableRefreshToken: false,
    credentials: {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    },
    scopes: config.scopes,
  })

const anonymousFlow = async (config: ApiConfig): Promise<Token> => {
  const authClient = createAuthClient(config)

  return authClient.anonymousFlow()
}

const customerPasswordFlow = async (config: ApiConfig, credentials: CustomerCredentials): Promise<Token> => {
  const authClient = createAuthClient(config)

  return authClient.customerPasswordFlow(credentials)
}

const refreshTokenFlow = async (config: ApiConfig): Promise<Token> => {
  const authClient = createAuthClient(config)

  return authClient.refreshTokenFlow()
}


const isTokenExpired = (token: Token): boolean => Date.now() > token.expires_at

const createAccessTokenFlow = async (config: ApiConfig, options: FlowOptions = {}): Promise<Token> => {
  const { currentToken } = options

  if (options.customerCredentials) {
    return customerPasswordFlow(config, options.customerCredentials)
  }

  if (currentToken && !isTokenExpired(currentToken)) {
    return Promise.resolve(currentToken)
  }

  if (!currentToken) {
    return anonymousFlow(config)
  }

  if (isTokenExpired(currentToken)) {
    return refreshTokenFlow(config)
  }
}

export default createAccessTokenFlow
