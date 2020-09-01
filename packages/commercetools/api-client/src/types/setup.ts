/* eslint-disable camelcase */
import { ApolloClientOptions } from 'apollo-client';

export interface ApiConfig {
  uri: string;
  authHost: string;
  projectKey: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
}

export interface Token {
  access_token: string;
  expires_at: number;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token: string;
}

export interface CookiesConfig {
  currencyCookieName: string;
  countryCookieName: string;
  localeCookieName: string;
}

export interface LocaleItem {
  name: string;
  label: string;
}

export interface Auth {
  onTokenChange?: (token: Token) => void;
  onTokenRemove?: () => void;
}

export interface SetupConfig<TCacheShape> {
  api?: ApiConfig;
  currentToken?: Token;
  customOptions?: ApolloClientOptions<TCacheShape>;
  currency?: string;
  locale?: string;
  country?: string;
  countries?: LocaleItem[];
  currencies?: LocaleItem[];
  locales?: LocaleItem[];
  languageMap?: object;
  acceptLanguage?: string[];
  cookies?: CookiesConfig;
  auth?: Auth;
  forceToken?: boolean;
}

export interface CustomerCredentials {
  username: string;
  password: string;
}

// --

export interface Config {
  api: ApiConfig;
  currentToken?: Token;
  customOptions?: ApolloClientOptions<any>;
  currency: string;
  locale: string;
  country: string;
  countries: LocaleItem[];
  currencies: LocaleItem[];
  locales: LocaleItem[];
  languageMap: object;
  acceptLanguage: string[];
  cookies: CookiesConfig;
  auth?: Auth;
  forceToken?: boolean;
}

export interface ConfigurableConfig {
  api?: ApiConfig;
  currentToken?: Token;
  customOptions?: ApolloClientOptions<any>;
  currency?: string;
  locale?: string;
  country?: string;
  countries?: LocaleItem[];
  currencies?: LocaleItem[];
  locales?: LocaleItem[];
  languageMap?: object;
  acceptLanguage?: string[];
  forceToken?: boolean;
}
