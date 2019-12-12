
# About commercetools API Client

<!-- description of used technologies, purpose etc -->

## Setup

Before you can use any of the commercetools API Client methods you need to set it up with following properties

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

## Methods

### `getProduct`

Method responsible for fetching single or multiple products from commercetools GraphQL API. It accepts configuration object with following properties:

- `query` (optional) - alternative GraphQL query. Please keep in mind that modifying this property can break helper functions.
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

