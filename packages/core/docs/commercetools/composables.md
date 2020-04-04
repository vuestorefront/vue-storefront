---
platform: Commercetools
platform_pkg: commercetools
---


<IncludeContent content-key="composables" />

::: slot example-product-search
```js
import { useProduct } from '@vue-storefront/commercetools'

const { products, search, loading } = useProduct()

search({ id: '12345' })
```
:::

::: slot example-product-search-getters
```js
import { useProduct, productGetters } from '@vue-storefront/commercetools'

const { products, search } = useProduct()

search({ id: '12345' })

const attributes = computed(() => productGetters.getAttributes(product.value[0]))
```
:::
