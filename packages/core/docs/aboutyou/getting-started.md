---
platform: AboutYouCloud
---
 

<IncludeContent content-key="getting-started" />

<!-- Installation command -->
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
