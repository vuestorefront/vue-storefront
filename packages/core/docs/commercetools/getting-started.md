<IncludeContent content-key="getting-started" />


<!-- Installation command -->
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