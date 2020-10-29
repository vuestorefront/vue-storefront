---
platform: Shopify
---

::: warning Developer Preview 
The integration is currently on developer Preview phase and could be unstable. We recommend checking it out on our repository. 
Simply copy the [repo](https://github.com/DivanteLtd/vue-storefront) and run
```bash
yarn && yarn build:sp && yarn dev:sp
```
:::

<IncludeContent content-key="getting-started" />

<!-- Installation command -->
::: slot installation
```bash
npm install --save @vue-storefront/shopify @vue-storefront/shopify-api
# OR
yarn add @vue-storefront/shopify @vue-storefront/shopify-api
```
:::

::: slot setup
```js
import { setup } from '@vue-storefront/shopify-api'

setup({
  // configuration of your eCommerce integration
})
:::

