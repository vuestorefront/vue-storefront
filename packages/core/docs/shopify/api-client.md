---
platform: Shopify
---


<IncludeContent content-key="api-client" />

<!-- Code example for setup method -->
::: slot setup
```javascript
import { setup } from '@vue-storefront/shopify-api'

setup({
  domain: 'example.myshopify.com',
  storefrontAccessToken: '28d86b7cb13a0b128fb61e48c6358845'
})
```
