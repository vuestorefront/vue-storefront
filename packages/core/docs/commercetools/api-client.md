---
platform: Commercetools
---


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
- `auth?: Auth`
```js
export interface Auth {
  onTokenChange?: (token: Token) => void;
  onTokenRemove?: () => void;
}
```

### Commercetools token handling

Commercetools platform requires token to load data from the API. Our api-client generates this token itself, but you have to store it to prevent generating this multiple times. In order to do it, you can use  `onTokenChange` event to react on token updating and `setup` function for reconfiguration.

The most common use-case is storing that token using cookies:

```js
import { setup } from '@vue-storefront/commercetools-api';
import { config } from './your/config';

const currentToken = app.$cookies.get('ct-token');

const onTokenChange = (token) => {
  app.$cookies.set('ct-token', token);
};

setup({ ...config, currentToken, auth: { onTokenChange } });
```

Sometimes, you may need more flexibility and you want to create a new token by yourself. It's useful, for instance when you want to integrate it with server middlewares and fetch the token first, before others calls.

There is a function `createAccessToken` that gives you that possibility, it generates an access token on-demand.

```js
import { createAccessToken } from '@vue-storefront/commercetools-api';
import { setup } from '@vue-storefront/commercetools-api';
import { config } from './your/config';

const serverMiddleware = async ({ app }) => {
  let currentToken = app.$cookies.get('ct-token');

  if (!currentToken) {
    currentToken = await createAccessToken();
  }

  app.$cookies.set('vsf-commercetools-token', currentToken);

  setup({ ...config, currentToken });
};

export default serverMiddleware;
```

:::

::: slot methods

You can find detailed information about all API Client methods [here](./api-client/index.html)
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
