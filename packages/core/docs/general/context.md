# Context API

## Structure

```js
$vsf {
  $ct: {
    api: {},
    client: {},
    config: {}
  }
  ...
}
```
- `$vsf` - general key that keeps vue storefront context
- `$ct` - integration key
- `api` - field that always keep api function for given integration
- `client` - field that always keep api client/connection for given integration
- `config` - field that always keep configuration for given integration
- others - depending on the needs you can put into the context any field you want (under the corresponding key)

## Usage in api client functions
IMPORTANT: The api-client context is not the one within the entire app, it gives you only access to configuration and connection, it doesn't know anything about the application logic

```js
const createCart = async ({ config, client }, cartDraft, customQueryFn?) => {
  // config - access to current config
  // client - access to current api connection / client

  const { locale, acceptLanguage, currency } = config;

  const request = await client.mutate({
    mutation: gql`${query}`,
    variables: { locale, acceptLanguage, currency },
    fetchPolicy: 'no-cache'
  });

  return request;
};
```

## Usage in components

```js
import { useVSFContext } from '@vue-storefront/core'

setup () {
  const { $ct } = useVSFContext();

  // $ct.api
  // $ct.client
  // $ct.config
}
```

## Usage in factory params

```js
const factoryParams = {
  addToCart: async (context, { product, quantity }, customQuery?) => {
    const { data } = await context.$ct.api.addToCart(product, quantity, customQuery);

    return data.cart;
  },
}
```

## Usage in nuxt middlewares

```js
export default async ({ app, $vsf }) => {
  const { data: { me: { activeCart } } } = await $vsf.$ct.api.getMe();

  if (activeCart) {
    app.context.redirect('/checkout');
  }
};
```

## Creating api client for integration

```js
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import { apiClientFactory } from '@vue-storefront/core';

const onSetup = (config) => {
  const client = new EcommerceAPI(config)

  return {
    config,
    client
  };
};

const { createApiClient } = apiClientFactory({
  tag: 'ct',
  onSetup,
  api: {
    getProduct,
    getCategory,
  }
});
```

## Exposing an integation plugin for nuxt

```js
import { createApiClient } from '@vue-storefront/commercetools-api';


// exposing an integration plugin for nuxt
export const integrationPlugin = integrationPluginFactory(createApiClient);
```


## Registering integration (nuxt plugin)

```js
import { integrationPlugin } from '@vue-storefront/commercetools'

export default integrationPlugin(({ app, integration }) => {
  const settings = { api: '/graphql', user: 'root' }

  integration.configure(settings)
});
```

## Extending integration (nuxt plugin)

```js
import { integrationPlugin } from '@vue-storefront/commercetools'
import productProjection from './api/productProjection';
import restClient from './api/rest-client';

export default integrationPlugin(({ app, $extend }) => {
  const integrationTag = 'ct' // extend comemrcetools integration

  const props = {
    api: {
      productProjection // will merge previous api with a new one, context will be applied to the given function
    },
    config: {
      facetingUrl: '/faceting' // will merge previous config with a new one
    },
    client: { // will merge previous new one, and add a new property
      rest: restClient
    },
    hasPromoCookie: app.$cookies.get('promo') // that will just add a new field under the $ct key
  }

  $extend(integrationTag, props)
});
```
