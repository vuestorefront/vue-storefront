
<IncludeContent content-key="api-client" />

<!-- Code example for setup method -->
::: slot setup
```javascript
import { setup } from '@vue-storefront/commercetools-api'

setup({
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
**`setup`** accepts following properties:


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
:::

::: slot methods

<CTIncludeApiClientDoc />

:::

::: slot override

```js
import { override } from '@vue-storefront/commercetools-api'

override({
  getProduct(params) {
    // new getProduct
  },
  getCategory (params) {
    // new getCategory
  }
  // ...
})
```
:::