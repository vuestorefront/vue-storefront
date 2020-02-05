<ApiClient />

<!-- Installation command -->
::: slot installation-ct
```bash
npm install --save @vue-storefront/commercetools-api
# OR
yarn add @vue-storefront/commercetools-api
```
:::

<!-- Code example for setup method -->

::: slot setup-ct
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
:::

<!-- API Client methods -->
::: slot standalone-installation-ct 
```bash
yarn add @vue-storefront/commercetools-api
# OR
npm install --save @vue-storefront/commercetools-api
:::

::: slot methods-ct

### `getProduct`


Method responsible for fetching single or multiple products from commercetools GraphQL API. 

```js
const { data } = await getProduct({ slug: 'black-dress' })
```

It accepts configuration object with following properties:

- `limit?: number`
- `offset?: number`
- `sort?: string[]`
- `catIds?: string[]`
- `skus?: string[]`
- `slug?: string`
- `query?: CustomQuery` - custom GraphQL query. Please keep in mind that modifying this property can break helper functions.
  <details>
  <summary>See default query</summary>
  <p>
  ```
  fragment Images on ProductVariant {
    images {
      url
      label
    }
  }

  fragment Price on ProductVariant {
    price(currency: $currency) {
      value {
        type
        currencyCode
        centAmount
        fractionDigits
      }
    }
  }

  fragment DefaultVariant on ProductVariant {
    sku
    ...Images
    ...Price
  }

  query products(
    $where: String
    $sort: [String!]
    $limit: Int
    $offset: Int
    $skus: [String!]
    $locale: Locale
    $currency: Currency!
  ) {
    products(where: $where, sort: $sort, limit: $limit, offset: $offset, skus: $skus) {
      offset
      count
      total
      results {
        id
        masterData {
          current {
            name(locale: $locale)
            metaTitle(locale: $locale)
            metaKeywords(locale: $locale)
            metaDescription(locale: $locale)
            allVariants {
              ...DefaultVariant
            }
            masterVariant {
              ...DefaultVariant
            }
          }
        }
      }
    }
  }
  ```

  </p>
  </details>  

### `getCategory`
:::
