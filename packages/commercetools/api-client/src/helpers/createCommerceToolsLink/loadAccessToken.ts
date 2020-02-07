import { ApiConfig, CustomerCredentials } from './../../types/setup'
import { storeToken, getToken } from './../../helpers/createCommerceToolsLink/tokenCache'
import createAccessTokenFlow from './tokenFlow'

const loadAccessToken = async (config: ApiConfig, customerCredentials?: CustomerCredentials ): Promise<string> => {
  const token = await createAccessTokenFlow(config, { currentToken: getToken(), customerCredentials })

  storeToken(token)

  return token.access_token
};

export default loadAccessToken
