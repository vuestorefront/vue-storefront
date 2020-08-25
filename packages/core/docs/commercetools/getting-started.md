---
platform: Commercetools
---
 

<IncludeContent content-key="getting-started" />

<!-- Installation command -->
::: slot installation-nuxt
```bash
npm install --save @vue-storefront/commercetools @vue-storefront/nuxt
# OR
yarn add @vue-storefront/commercetools @vue-storefront/nuxt
```
:::

::: slot installation
```bash
npm install --save @vue-storefront/commercetools @vue-storefront/commercetools-api
# OR
yarn add @vue-storefront/commercetools @vue-storefront/commercetools-api
```
:::

::: slot setup
```js
import { setup } from '@vue-storefront/commercetools-api'

setup({
  // configuration of your eCommerce integration
})
:::

::: slot nuxt-setup-module
```js
['@vue-storefront/nuxt', {
  useRawSource: {
    dev: [
      '@vue-storefront/commercetools',
      '@vue-storefront/core'
    ],
    prod: [
      '@vue-storefront/commercetools',
      '@vue-storefront/core'
    ]
  }
}],
['@vue-storefront/commercetools/nuxt', {
  api: {
    uri: 'https://yourshop.com/vsf-ct-dev/graphql',
    authHost: 'https://auth.sphere.io',
    projectKey: 'vsf-ct-dev',
    clientId: '<your_client_id>',
    clientSecret: '<your_client_secret>',
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
}]
```
:::
