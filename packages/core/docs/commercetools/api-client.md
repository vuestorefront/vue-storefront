---
platform: Commercetools
---


<IncludeContent content-key="api-client" />

<!-- Code example for setup method -->
::: slot setup
```javascript
import { createApiClient } from '@vue-storefront/commercetools-api'

const { client, api, config } = createApiClient({
  api: {
    uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
    authHost: 'https://auth.sphere.io',
    projectKey: 'vsf-ct-dev',
    clientId: 'xlea3xo3vcavMN5kmDlFP4nu',
    clientSecret: process.env.CT_CLIENT_SECRET,
    scopes: [
      'create_anonymous_token:vsf-ct-dev',
      'manage_my_orders:vsf-ct-dev',
      'manage_my_profile:vsf-ct-dev',
      'manage_my_shopping_lists:vsf-ct-dev',
      'manage_my_payments:vsf-ct-dev',
      'view_products:vsf-ct-dev',
      'view_published_products:vsf-ct-dev'
    ]
  }
})
```
**`createApiClient`** accepts following properties:

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



