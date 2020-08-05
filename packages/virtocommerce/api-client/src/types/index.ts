import { ApolloClientOptions } from 'apollo-client';

export interface ApiConfig {
  uri: string;
}

export interface SetupConfig<TCacheShape> {
  api?: ApiConfig;
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
}

export interface LocaleItem {
  name: string;
  label: string;
}

export interface CookiesConfig {
  currencyCookieName: string;
  countryCookieName: string;
  localeCookieName: string;
}
