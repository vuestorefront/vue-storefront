---
platform: Shopify
platform_pkg: shopify
---


<IncludeContent content-key="composables" />

::: slot example-product-search
```js
import { useProduct } from '@vue-storefront/shopify'

const { products, search, loading } = useProduct()

search({ id: '12345' })
```
:::

::: slot example-product-search-getters
```js
import { useProduct, productGetters } from '@vue-storefront/shopify'

const { products, search } = useProduct()

search({ id: '12345' })

const attributes = computed(() => productGetters.getAttributes(product.value[0]))
```
:::
