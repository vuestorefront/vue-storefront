---
platform: AboutYouCloud
---
 

<IncludeContent content-key="getting-started" />

<!-- Installation command -->
::: slot installation-nuxt
```bash
npm install --save @vue-storefront/about-you @vue-storefront/about-you-api @vue-storefront/nuxt-theme @vue-storefront/nuxt
# OR
yarn add @vue-storefront/about-you @vue-storefront/about-you-api @vue-storefront/nuxt-theme @vue-storefront/nuxt
```
:::
::: slot installation
```bash
npm install --save @vue-storefront/about-you @vue-storefront/about-you-api
# OR
yarn add @vue-storefront/about-you @vue-storefront/about-you-api
```
:::

::: slot setup
```js
import { setup } from '@vue-storefront/about-you-api'

setup({
  // configuration of your eCommerce integration
})
:::

::: slot nuxt-setup-module
```js
['@vue-storefront/nuxt-theme'],
['@vue-storefront/nuxt', {
  coreDevelopment: true,
  useRawSource: {
    dev: [
      '@vue-storefront/about-you',
      '@vue-storefront/core'
    ],
    prod: [
      '@vue-storefront/about-you',
      '@vue-storefront/core'
    ]
  }
}],
['@vue-storefront/about-you/nuxt', {
  api: {
    host: 'https://yourwebsite.com/v1/',
    auth: {
      username: 'yourusername',
      password: 'yourpassword'
    }
  },
  imgUrl: 'https://yourwebsite/saintlouis',
}]
```
:::
