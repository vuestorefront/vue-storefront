# Middleware draft & integration guide


## 1. Create two entry points in api-client

### directory `direct` - contains the api client creation for direct connection with platform:

```js
import { apiClientFactory } from '@vue-storefront/core';
import * as api from './../api';
import { integrationPluginFactory } from '@vue-storefront/core';

const onSetup = (settings:) => {
  // ...

  return { client, config }
};

const { createApiClient } = apiClientFactory<Config, any>({
  tag: 'ct',
  onSetup,
  api
});

const integrationPlugin = integrationPluginFactory(createApiClient);

const middlewareExtensions = {
  commercetoolsTokenExtension: (req, res) => ({
    beforeSetup: (config) => ({
      return { ...config }
    }),
    afterSetup: () => {

    },
    beforeCall: () => {},
    afterCall: () => {}
  })
};
export {
  createApiClient,
  integrationPlugin,
  middlewareExtensions
};

```

Key requirements: api client (direct) must always expose `createApiClient`, `integrationPlugin` and `middlewareExtensions`

### directory `src` - contains the api client creation

```js
import { apiClientFactory, integrationPluginFactory } from '@vue-storefront/core';

const onProxySetup = (settings: any) => {
  // ...
  return { config };
};

const { createApiClient: createProxyApiClient } = apiClientFactory<any, any>({
  tag: 'ct',
  onSetup: onProxySetup,
  api: Object.keys(api),
  isProxy: true
});

const integrationProxyPlugin = integrationPluginFactory(createProxyApiClient);

export {
  createProxyApiClient,
  integrationProxyPlugin
};

```

Key requirements: api client (direct) must always expose `createApiClient` and `integrationProxyPlugin`

Package should have two entrypoints: first one points to direct and second one to the root of the package (using src/index)

## 2. Composables

Composables has to load certain plugin depending on the mode: proxy or direct

## 3. Nuxt config

Provide an api client for given integration and please use the same key name as tag in creation:

```js
  modules: [
    ['@vue-storefront/middleware', {
      apiClient: {
        ct: '@vue-storefront/commercetools-api'
      }
    }]
  ],

```
