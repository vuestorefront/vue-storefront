import { ApolloClientOptions } from 'apollo-client';

export interface ApiConfig {
  uri: string;
}

export interface SetupConfig<TCacheShape> {
  api?: ApiConfig;
  customOptions?: ApolloClientOptions<TCacheShape>;
}
