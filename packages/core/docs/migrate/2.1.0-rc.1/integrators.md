# Integrators upgrade notes


## API client functions

### Before
```js
const getProduct = async (id) => {
  const { client, config } = getSettings();

  return client.get('/product', id)
}
```

### After
```js
const getProduct = async ({ client, config }, id) => {
  return client.get('/product', id)
}
```

## API client creation

### Before
```js
import { apiClientFactory } from '@vue-storefront/core';

let apiClient = null;

const onCreate = (setupConfig) => {
    apiClient = new SomeConnection({
      host: setupConfig.api.host,
      auth: {
        username: setupConfig.api.auth.username,
        password: setupConfig.api.auth.password
      },
      shopId: setupConfig.api.shopId
    });
  }

const { setup, update, getSettings } = apiClientFactory<any, any>({
  defaultSettings: {},
  onCreate
});

export {
  apiClient,
  getSettings,
  setup,
  update
};
```

### After

```js
import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';

const onCreate = (setupConfig) => {
  const apiClient = new SomeConnection({
    host: setupConfig.api.host,
    auth: {
      username: setupConfig.api.auth.username,
      password: setupConfig.api.auth.password
    },
    shopId: setupConfig.api.shopId
  });

  return {
    client: apiClient,
    config: setupConfig
  }
}

const { createApiClient } = apiClientFactory<any, any>({
  tag: 'tag',
  defaultSettings: {},
  onCreate,
  api: {
    getProduct
  }
});

export { createApiClient };
```

## Nuxt plugin for integration

### Before
```js
import { setup } from '@vue-storefront/integration-name';

export default ({ app }) => {
  setup({
    api: {
      host: '<%= options.api.host %>',
      auth: {
        username: '<%= options.api.auth.username %>',
        password: '<%= options.api.auth.password %>'
      },
      shopId: selectedLocale.shopId
    },
  });
}
```

### After
```js
import { integrationPlugin } from '@vue-storefront/integration-name'

export default integrationPlugin(({ app, integration }) => {
  integration.configure({
    api: {
      host: '<%= options.api.host %>',
      auth: {
        username: '<%= options.api.auth.username %>',
        password: '<%= options.api.auth.password %>'
      },
      shopId: selectedLocale.shopId
    },
  })
});
```

## Usage api in factoryParams

### Before
```js
import { getCart, addToCart } from '@vue-storefront/integration-name';

const factoryParams = {
  loadCart: async () => {
    const { data } = await getCart();

    return data.cart;
  },
  addToCart: async (params) => {
    const { currentCart, product, quantity } = params;
    const { data } = await addToCart(loadedCart, product, quantity, customQuery);

    return data.cart;
  },
};
```
### After

```js
const factoryParams = {
  loadCart: async (context) => {
    const { data } = await context.$tag.api.getCart();

    return data.cart;
  },
  addToCart: async (context, params) => {
    const { currentCart, product, quantity } = params;
    const { data } = await context.$tag.api.addToCart(loadedCart, product, quantity, customQuery);

    return data.cart;
  },
};
```

