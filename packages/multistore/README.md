# @vue-storefront/multistore

The `@vue-storefront/multistore` package provides a middleware extension for multistore functionality. It changes the middleware configuration to support multiple stores based on the domain configuration.

## Prerequisites

Ensure the following prerequisites are met for the unified multistore solution:

- It works within the VSF infrastructure.
- Requires three headers for proper functionality:
  1. `origin` for client-server communication.
  2. `x-forwarded-host` for server-server communication.
  3. `host` as a fallback for server-server communication if `x-forwarded-host` is absent.
- The client communicating with the middleware must include these headers in requests.

## Setup Steps

To configure multistore in your middleware, follow these steps:

1. Extend Middleware Config with multistore Extension

- Import `multistoreExtension` from `@vue-storefront/multistore`.
- Extend the middleware config in `middleware.config.ts`.

Example: Add `multistoreExtension` to the extensions array for SAP integration.

```ts [middleware.config.ts]
import { multistoreExtension } from '@vue-storefront/multistore';

export default {
  integrations: {
    sap: {
      location: '@vue-storefront/sapcc-api/server',
      configuration: { ... },
      extensions: (predefinedExtensions) => [
        ...predefinedExtensions,
        multistoreExtension
      ]
    }
  }
};
```

2. Create multistore Configuration

- Prepare a `multistore.config.ts` file with methods:
  - `fetchConfiguration({ domain })`: Returns store-specific configurations based on domain.
  - `mergeConfigurations({ baseConfig, storeConfig })`: Merges base configuration with store-specific settings.
  - `cacheManagerFactory()`: Implements cache manager with get and set methods.

Example: Configuration that modifies the api parameter and uses `node-cache`.

```ts [multistore.config.ts]
import NodeCache from "node-cache";

export const multistoreConfig = {
  fetchConfiguration(/* { domain } */) {
    return {
      "my-apparel-domain.io": {
        baseSiteId: "apparel-uk",
        defaultCurrency: "GBP",
        // ...
      },
      "my-electronics-domain.io": {
        baseSiteId: "electronics",
        defaultCurrency: "USD",
        // ...
      },
    };
  },
  mergeConfigurations({ baseConfig, storeConfig }) {
    return {
      ...baseConfig,
      api: {
        ...baseConfig.api,
        ...storeConfig,
      },
    };
  },
  cacheManagerFactory() {
    const client = new NodeCache({
      stdTTL: 10,
    });

    return {
      get(key) {
        return client.get(key);
      },
      set(key, value) {
        return client.set(key, value);
      },
    };
  },
};
```

3. Integrate multistore Configuration

- Add the multistore configuration from `multistore.config.ts` to your `middleware.config.ts`.

Example: Add multistore configuration to `middleware.config.ts`.

```ts [middleware.config.ts]
import { multistoreConfig } from "./multistore.config";

export default {
  integrations: {
    sap: {
      location: "@vue-storefront/sapcc-api/server",
      configuration: {
        // ...
        multistore: multistoreConfig,
      },
      extensions: (predefinedExtensions) => [
        ...predefinedExtensions,
        multistoreExtension,
      ],
    },
  },
};
```