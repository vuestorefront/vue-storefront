# Upgrading to 1.3.3

## Introduction

In the 1.3.3 release, we added new options to the `serverApi` introduced in the 1.3.2 release.

## Changes

In the 1.3.2 release, we introduced a new key named `serverApi` to the commercetools middleware configuration. It stores API client used to generate access tokens for selected operations. However, we quickly noticed the need to allow adding other operations that will use these access tokens. That's why in this release we added new `operations` option to the `serverApi` configuration.

```javascript{9-15}
// middleware.config.js
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        // irrelevant configuration was omitted for readability
        serverApi: {
          clientId: 'SERVER_ID',
          clientSecret: 'SERVER_SECRET',
          scopes: [
            'manage_customers:PROJECT_KEY',
            'manage_products:PROJECT_KEY'
          ],
          operations: []
        }
      }
    }
  }
};
```

:::warning Custom operations might require additional scopes
Remember that custom operations added to the `operations` array might require additional scopes.
:::


### Example

Let's assume you have custom GraphQL that adds new mutation like shown below:

```graphql
mutation AddProductType(
  $draft: ProductTypeDraft!
) {
  productType: createProductType(draft: $draft) {
    name
    description
    key
  }
}
```

In this case, you need to add `createProductType` to the `operations` array:

```javascript{9-11}
// middleware.config.js
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        // irrelevant configuration was omitted for readability
        serverApi: {
          operations: [
            'createProductType'
          ]
        }
      }
    }
  }
};
```