# Configuration

```javascript
import { createApiClient } from '@vue-storefront/commercetools-api'

['@vue-storefront/commercetools/nuxt', {
  /* configuration */
}]
```

- `api: ApiConfig`
```js
export interface ApiConfig {
  uri: string;
  authHost: string;
  projectKey: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
}
```
- `customOptions?: ApolloClientOptions<TCacheShape>`
- `currency?: string`
- `locale?: string`
- `languageMap?: object`
- `acceptLanguage?: string[]`
- `country?: string`
- `countries?: LocaleItem[]`
```js
export interface LocaleItem {
  name: string;
  label: string;
}
```
- `currencies?: LocaleItem[]`
- `locales?: LocaleItem[]`
- `cookies?: CookiesConfig`
```js
export interface CookiesConfig {
  currencyCookieName: string;
  countryCookieName: string;
  localeCookieName: string;
}
```
- `auth?: Auth`
```js
export interface Auth {
  onTokenChange?: (token: Token) => void;
  onTokenRead?: () => string;
  onTokenRemove?: () => void;
}
```


### Localisation

Commercetools supports querying localised fields via an array of accepted languages - `acceptLanguage`.
```js
acceptLanguage: ['en-gb', 'en-us']
```

If you supply a `languageMap` during setup this will be used to map a locale to the accepted languages.
```js
languageMap: {
  'en-gb': ['en-gb', 'en-us'],
  'en-us': ['en-us', 'en-gb'],
}
```



