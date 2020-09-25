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

::: slot example-product-search-custom-query
## Custom Query 

There's an option to use your own Graphql query and additional variables while searching by provising a second parameter to the composable. This parameter should be a function returning two properties:

- `query` - GraphQL query that will be used instead of the default one;
- `variables` - data object that will be shallowly merged (only one level deep, where provided keys have precedence) with data object provided as a first parameter.

```js
import { useProduct } from '@vue-storefront/commercetools'

const { search } = useProduct()

search({ id: '12345' }, () => ({ query, variables }))
```

You can use it for `useProduct`, `useCategory`, `useUser` and `useUserOrders` composables.
:::
