# Unified multi-store

Unified multi-store approach for VSF eCommerce integrations.

## Prerequisites

A unified multi-store solution was designed to work in VSF infrastructure. It requires 3 headers to work properly
- `origin` for client-to-server communication,
- `x-forwarded-host` for server-to-server communication,
- `host` for server-to-server communication, as a fallback if there is no `x-forwarded-host`.
Be sure that the client used to communicate with the middleware is adding those headers to the requests!

## Getting started

Unified multi-store is an extension for VSF middleware that overwrites the base configuration with a store-specific config.
To set up multi-store in your VSF middleware:

1. Import `multistoreExtension` from `@vue-storefront/multistore` package and extend the middleware config. SAP example:

```diff
# middleware.config.js

require('dotenv').config();
+ const { multistoreExtension } = require('@vue-storefront/multistore');

module.exports = {
  integrations: {
    sapcc: {
      location: '@vsf-enterprise/sapcc-api/server',
+     extensions: (extensions) => [
+       ...extensions,
+       multistoreExtension
+     ],
      configuration: {
        OAuth: {
          uri: process.env.SAPCC_OAUTH_URI,
          clientId: process.env.SAPCC_OAUTH_CLIENT_ID,
          clientSecret: process.env.SAPCC_OAUTH_CLIENT_SECRET,
          tokenEndpoint: process.env.SAPCC_OAUTH_TOKEN_ENDPOINT,
          tokenRevokeEndpoint: process.env.SAPCC_OAUTH_TOKEN_REVOKE_ENDPOINT,
          cookieOptions: {
            'vsf-sap-token': { secure: process.env.NODE_ENV !== 'development' }
          }
        },
        api: {
          uri: process.env.SAPCC_API_URI,
          baseSiteId: 'electronics',
          catalogId: 'electronicsProductCatalog',
          catalogVersion: 'Online',
          defaultLanguage: 'en',
          defaultCurrency: 'USD'
        }
      }
    }
  }
};
```

2. Prepare multistore configuration. Create `multistore.config.js` file containing the following methods

- `fetchConfiguration({ domain }): Record<string, StoreConfig>` - fetches store configuration. The method accepts the domain as an argument and returns with the store-specific configuration based on the domains where the domain is a key and the configuration is a value.
- `mergeConfigurations({ baseConfig, storeConfig }): StoreConfig` - overwrites base configuration with store-specific config.
- `cacheManagerFactory(): { get: (key: string) => StoreConfig, set(key: string, value: StoreConfig)}` - creates cache manager with `get` and `set` methods.

Example multistore configuration, which overwrites the `api` parameter of base configuration and uses `node-cache` as a cache manager.

```javascript
// multistore.config.js

const NodeCache = require('node-cache');

module.exports = {
  fetchConfiguration(/* { domain } */) {
    return {
      'my-apparel-domain.io': {
        baseSiteId: 'apparel-uk',
        catalogId: 'apparelProductCatalog',
        catalogVersion: 'Online',
        defaultLanguage: 'en',
        defaultCurrency: 'GBP'
      },
      'my-electronics-domain.io': {
        baseSiteId: 'electronics',
        catalogId: 'electronicsProductCatalog',
        catalogVersion: 'Online',
        defaultLanguage: 'en',
        defaultCurrency: 'USD'
      }
    };
  },
  mergeConfigurations({ baseConfig, storeConfig }) {
    return {
      ...baseConfig,
      api: {
        ...baseConfig.api,
        ...storeConfig
      }
    };
  },
  cacheManagerFactory() {
    const client = new NodeCache({
      stdTTL: 10
    });

    return {
      get(key) {
        return client.get(key);
      },
      set(key, value) {
        return client.set(key, value);
      }
    };
  }
};
```

3. Add multi-store configuration to `middleware.config.js`:

```diff
# middleware.config.js

require('dotenv').config();
+ const multistore = require('./multistore.config');
const { multistoreExtension } = require('@vue-storefront/multistore');

module.exports = {
  integrations: {
    sapcc: {
      location: '@vsf-enterprise/sapcc-api/server',
      extensions: (extensions) => [
        ...extensions,
        multistoreExtension
      ],
      configuration: {
        OAuth: {
          uri: process.env.SAPCC_OAUTH_URI,
          clientId: process.env.SAPCC_OAUTH_CLIENT_ID,
          clientSecret: process.env.SAPCC_OAUTH_CLIENT_SECRET,
          tokenEndpoint: process.env.SAPCC_OAUTH_TOKEN_ENDPOINT,
          tokenRevokeEndpoint: process.env.SAPCC_OAUTH_TOKEN_REVOKE_ENDPOINT,
          cookieOptions: {
            'vsf-sap-token': { secure: process.env.NODE_ENV !== 'development' }
          }
        },
        api: {
          uri: process.env.SAPCC_API_URI,
          baseSiteId: 'electronics',
          catalogId: 'electronicsProductCatalog',
          catalogVersion: 'Online',
          defaultLanguage: 'en',
          defaultCurrency: 'USD'
        },
+       multistore
      }
    }
  }
};
```

## Architecture

### System context level

![System context level](https://res.cloudinary.com/vue-storefront/image/upload/v1674577953/Unified%20multi-store/Integrations_Workspace_-_System_context_level_utxxzw.jpg)

### Vue Storefront Integration container level

![System container level](https://res.cloudinary.com/vue-storefront/image/upload/v1674577953/Unified%20multi-store/Integrations_Workspace_-_System_container_level_jbhk66.jpg)

### Middleware component level

![System component level](https://res.cloudinary.com/vue-storefront/image/upload/v1674577953/Unified%20multi-store/Integrations_Workspace_-_System_component_level_-_Middleware_with_multistore_1_at6dqq.jpg)

### Unified multi-store sequence diagram

![Sequence diagram](https://res.cloudinary.com/vue-storefront/image/upload/v1674577949/Unified%20multi-store/Unified_multi-store_1_kwbuu1.png)
