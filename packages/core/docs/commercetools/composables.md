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

There's an option to use your own Graphql query and variables while searching.   

```js
import { useProduct } from '@vue-storefront/commercetools'

const { search } = useProduct()

search({ id: '12345' }, (query, variables) => ({ query, variables }))
```

At the same time you can have access to the default query or variables and overwrite them. 

```js
const customQuery = (query, variables) => {
  // import a custom Graphql query
  const newQuery = require('./queries/customQuery.gql')
  // override "locale" variable and leave other ones untouched
  const newVariables = { ...variabes, locale: 'en' }
  
  return {
    query: newQuery,
    variables: newVariables
  }
}

search({ id: '12345', customQuery })
```

Use it for: `useProduct`, `useCategory`, `useUser`, `useUserOrders` methods.
:::
