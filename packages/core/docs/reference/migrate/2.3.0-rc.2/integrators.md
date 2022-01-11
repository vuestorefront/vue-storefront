# Migrating eCommerce integrations to 2.3.0-rc.2

## Introduction

This migration guide helps Integrators make their integrations and plugins compatible with version 2.3.0-rc.2.

It only contains code examples. For more information about this version, refer to the [Overview](./overview.md) page.

## API middleware

### Updating `api-client`
As described on the [Overview](./overview.md) page, API middleware lives next to Nuxt.js. That's why from now on, `api-client` must generate two files:
- one that exposes types, GraphQL fragments, and other files that don't contain any business logic,
- the other that returns `createApiClient` method created using `apiClientFactory` that exposes all the APIs that will be consumed by the middleware.

You should have two entry points in `src` folder: `index.ts` and `index.server.ts`:

```typescript
// api-client/src/index.ts
export * from './types';
```

```typescript
// api-client/src/index.server.ts
import { apiClientFactory } from '@vue-storefront/core';
import * as api from './api';

const onCreate = settings => ({
  config: {},
  client: {}
});

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api
});

export {
  createApiClient
};
```

We have to re-configure Rollup to build both files. Basic configuration should look like this:

```javascript{22,36}
// api-client/rollup.config.js
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

// External packages
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
];

// Plugins
const plugins = [
  typescript({
    typescript: require('typescript')
  })
];


export default [
  // Client
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.cjs.js', // Add this directory to .gitignore
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'lib/index.es.js', // Add this directory to .gitignore
        format: 'es',
        sourcemap: true
      }
    ],
    external,
    plugins
  },

  // Server
  {
    input: 'src/index.server.ts',
    output: [
      {
        file: 'server/index.js', // Add this directory to .gitignore
        format: 'cjs',
        sourcemap: true
      }
    ],
    external,
    plugins
  },
];
```

We also changed how custom queries work. To make your APIs compatible use `context.extendQuery` method instead of `getCustomQuery`:

```typescript
// before
async function getProduct(context, params, customQueryFn?: CustomQueryFn) => {
  // ...
  const { query, variables } = getCustomQuery(
    customQueryFn, { defaultQuery, defaultVariables }
  );

  const request = await context.client.query({
    query: gql`${query}`,
    variables,
    // ...
  });
}

// after
import { CustomQuery } from '@vue-storefront/core';

async function getProduct(context, params, customQuery?: CustomQuery) => {
  // ...
  const { products } = context.extendQuery(
    customQuery, { products: { query: defaultQuery, variables: defaultVariables } }
  );

  const request = await context.client.query({
    query: gql`${products.query}`,
    variables: products.variables
  });
};
```

In the example above `products` matches the name of the GraphQL query.

`extendsQuery` decides whether to load default query (implemented in the integration) or custom one, defined by the user in the project.

### Updating `composables`

In `nuxt/plugin.js` add the tag name of your integration package as a first argument of `integration.configure` method:

```javascript
// composables/nuxt/plugin.js
import { integrationPlugin } from '@vue-storefront/core';

const moduleOptions = <%= serialize(options) %>;

export default integrationPlugin(({ integration }) => {
  integration.configure('boilerplate', {
    ...moduleOptions
    // other options
  });
});
```

### Updating `theme`

As described on the [Overview](./overview.md) page, we need to create `middleware.config.js` in the root of the `theme`:

```javascript
// theme/middleware.config.js
module.exports = {
  integrations: {
    '<TAG NAME>': {
      location: '<PATH>',
      configuration: '<CONFIGURATION>'
    }
  }
};

```

- `<TAG NAME>` - the name of your integration and must match the one provided in the `composables/nuxt/plugin.js`.
- `<PATH>` - path to your server package and must match the output of `api-client/src/index.server.ts` built by Rollup (usually `@your-api-integration/server`).
- `<CONFIGURATION>` - integration configuration that previously lived in `nuxt.config.js`.

The last step is to add `'@vue-storefront/middleware/nuxt'` to the `modules` in `nuxt.config.js`.

:::warning Be careful
Make sure this package is added to the `modules` array, not `buildModules`.
:::

```javascript
// nuxt.config.js
export default {
  modules: [
    '@vue-storefront/middleware/nuxt'
  ]
};
```

## Checkout

### Updating `composables`

We added the following composables:
- `useShipping` for handling shipping information,
- `useBilling` for handling billing information,
- `useShippingProvider` for handling shipping providers,
- `useMakeOrder` for placing the final order.

We added two new components to delegate UI-related logic:
- `components/Checkout/VsfPaymentProviderMock` (`Mock` because commercetools doesn't handle payments),
- `components/Checkout/VsfShippingProvider`.

We also used this opportunity to cleanup other composables:
- removed `useCheckout`,
- removed `checkoutGetters`,
- renamed `useUserOrders` to `useUserOrder` to be consistent with other composables,
- renamed `isOnCart` and `isOnWishlist` in `useCart` composable to `isInCart` and `isInWishlist`.

## UI

We added and updated multiple UI elements. Please refer to the [UI section](./overview.md#ui) of the Overview page for more details.

Notable changes are:
- renamed `components/checkout` directory in core theme to `components/Checkout` (note the capital `C`). Please update your imports,
- added new integration-specific components:
  - `components/Checkout/CartPreview.vue` (previously implemented as `components/checkout/CartPreview.vue` in the core theme),
  - `components/Checkout/UserBillingAddresses.vue`,
  - `components/Checkout/UserShippingAddresses.vue`,
- added new integration-specific middleware `middleware/is-authenticated.js`,
