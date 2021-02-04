---
platform: VirtoCommerce
---


<IncludeContent content-key="getting-started" />

<!-- Installation command -->
::: slot installation-nuxt
```bash
npm install --save @vue-storefront/virtocommerce @vue-storefront/nuxt
# OR
yarn add @vue-storefront/virtocommerce @vue-storefront/nuxt
```
:::

::: slot installation
```bash
npm install --save @vue-storefront/virtocommerce
# OR
yarn add @vue-storefront/virtocommerce
```
:::

::: slot setup
```js
import { setup } from '@vue-storefront/virtocommerce-api'

setup({
  // configuration of your eCommerce integration
})
:::

::: slot nuxt-setup-module
```js
 ['@vue-storefront/nuxt', {
      // @core-development-only-start
      coreDevelopment: true,
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/virtocommerce',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/virtocommerce',
          '@vue-storefront/core'
        ]
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      generate: {
        replace: {
          apiClient: '@vue-storefront/virtocommerce-api',
          composables: '@vue-storefront/virtocommerce'
        }
      }
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/virtocommerce/nuxt', {
      api: {
        uri: 'http://localhost:3000'
      },
      store: "Electronics",
      currency: "USD",
      locale: "en-US",
      catalogId: "4974648a41df4e6ea67ef2ad76d7bbd4",
      countries: [
        { name: 'US',
          label: 'United States' },
        { name: 'AT',
          label: 'Austria' },
        { name: 'DE',
          label: 'Germany' },
        { name: 'NL',
          label: 'Netherlands' }
      ]
    }]
  ],
  proxy: {
    '/graphql': {
      target: 'https://admin-demo.virtocommerce.com/graphql',
      secure: false,
      pathRewrite: {
        '^/graphql' : '/'
        }
      },
      '/connect/token': {
        target: 'https://admin-demo.virtocommerce.com/connect/token',
        secure: false,
        pathRewrite: {
          '^/connect/token' : '/'
          }      
      },
    },
```
:::
