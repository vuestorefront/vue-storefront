---
platform: Shopify
---


<IncludeContent content-key="getting-started" />

<!-- Installation command -->
::: slot installation
```bash
npm install --save @vue-storefront/commercetools @vue-storefront/shopify-api
# OR
yarn add @vue-storefront/commercetools @vue-storefront/shopify-api
```
:::

::: slot setup
```js
import { setup } from '@vue-storefront/shopify-api'

setup({
  // configuration of your eCommerce integration
})
:::
