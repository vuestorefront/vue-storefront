# Commerce tools API

### Commerce tools api setup

```javascript
import { setup } from '@vue-storefront/commercetools-api'

setup({
  config: {
    uri: 'https://api.commercetools.com/vue-storefront-next/graphql',
    authHost: 'https://auth.sphere.io',
    projectKey: 'vue-storefront-next',
    clientId: 'ULi2QVos7ZoeBD_cY90aFNmc',
    clientSecret: '2eX7tGiZsZt0uexGQlcF2tgwbWEXIgbf',
    scopes: ['manage_products:vue-storefront-next'],
  }
})
```

### Example usage

```javascript
  import { getProduct } from '@vue-storefront/commercetools-api'

  const product = await getProduct()
```

