import { ApolloClientOptions } from 'apollo-client'

export interface ApiConfig {
  uri: string,
  authHost: string,
  projectKey: string,
  clientId: string,
  clientSecret: string,
  scopes: string[]
}

export interface Token {
  access_token: string,
  expires_at: number,
  expires_in: number,
  scope: string,
  token_type: string
}

export interface SetupConfig<TCacheShape> {
  api?: ApiConfig,
  customOptions?: ApolloClientOptions<TCacheShape>
  currency: string,
  locale: string,
  country?: string
}
