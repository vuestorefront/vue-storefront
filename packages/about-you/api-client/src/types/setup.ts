export interface Auth {
  username: string;
  password: string;
}

export interface ApiConfig {
  host: string;
  auth: Auth;
  shopId: number;
}

export interface LocaleItem {
    name: string;
    label: string;
}

export interface SetupConfig {
  api?: ApiConfig;
  currency?: string;
  locale?: string;
  country?: string;
  countries?: LocaleItem[];
  currencies?: LocaleItem[];
  locales?: LocaleItem[];
}
