# Context API

The application context is essential when it comes to sharing something across the app. A runtime config, current connection to the API, API tokens, user session, and everything else that's related to the current request should be stored within the context.

The common solution that may come to your mind in such a case is using one global object to store everything you need in the app. However, by doing this you would be sharing data not only over the app but also across all of the incoming requests. That would cause lots of issues and your app won't be able to handle ordinary traffic.

## Context data structure

In Vue Storefront, each integration has a common structure of the context object. A root of the context starts with the `$vsf` key. Everything that's under this key is the integration keys which are storing the data for corresponding integration using the specific, predefined format.

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
- `api` - field that always keep api functions for given integration
- `client` - field that always keep api client/connection for given integration
- `config` - field that always keep configuration for given integration
- others - depending on the needs you can put into the context any field you want (under the corresponding key)

## Api-client creation

Since the api-client can be used as separated unity, and it's responsible for communication with the given integration, it is also related to the context API.

Each api function has context in the first argument that contains information about `client` and the `config`.

In terms of creation of context api, we need to pass each api-function to the factory params of `apiClientFactory` along with `tag` for the integration and `onSetup` function (if it's needed):

```js
import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';

const onSetup = (settings) => {
  const client = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
  });

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

export { createApiClient }
```

The `tag` in the configuration is sort of identifier what will be used as a context key.

Inside of `onSetup` function you can put a creation of the connection or anything else that's needed for preparing an api connection - remember, onSetup must always return the `client` and `config`.

## API client usage

If you want to use api-client as a separated unit. You can simply create an api connection and just use the api calls:

```js
const { api } = createApiClient({ url: '/graphql' })

api.getProduct({ id: 1 })
```

Api function that are available under the `api` field have already applied context (first argument in the ones you have created), so you don't have to pass it again, instead - you can skip the first argument, and use it as a regular function.


## Context composable function

To reach anything that's in the context, you have to use `useVSFContext` which implementation you can provide always by yourself.

```js
import { configureContext } from '@vue-storefront/core'

configureContext({
  useVSFContext: () => {
    // your own implementation
  }
});
```

Remember that we also use Nuxt (plugins) to provide and store each integration in the context, if you want to go with your own implementation, you must provide this as well.

By default, we are providing an implementation for Nuxt.js, so you can skip that process if you are using our core nuxt module.

The `useVSFContext` always returns the keys of integrations you have created before.

```js
const { $ct } = useVSFContext();

$ct.api.getProduct({ id: 1 })
```

## Factory params usage

In the factory params you have straight access to the context, always in the first argument.
This context gives you an access to all of the properties of given integration (`client`, `api`, `config`), and also to the multiple integrations (if you need it).

```js
const factoryParams = {
  addToCart: async (context, { product, quantity }) => {
    const { data } = await context.$ct.api.addToCart(product, quantity);

    return data.cart;
  },
}
```

## Dependencies between composables

Sometimes there is a need to create a dependency between composables. To do this, you have to implement special function called `provide`. This function is being called on the composable itself and the returned properties will be available in the context of the factoryParams functions.


```js
const factoryParams = {
  provide () {
    return useUser();
  },
  loadUser: async (context) => {
    const { data } = await context.$ct.api.getMe();

    context.setCart(data.activeCart)

    return data.user;
  },
}
```

## Generating context in your own composables without core factories

Sometimes, you want to avoid using core factories and you want to go with creating your own composable from scratch or maybe your own factory. Of course that can come with creating and using a context.


```js
import { generateContext, vsfRef } from '@vue-storefront/core';

const checkoutFactory = (factoryParams) => {
  const useCheckout = () => {
    const context = generateContext(factoryParams)
    const order = vsfRef(null, 'custom-checkout-order')

    const placeOrder = async (params) => {
      order.value = factoryParams.placeOrder(context, params)
    }

    return { order, placeOrder }
  }

  return useContext
}

const factoryParams = {
  placeOrder: async (context, params) => {
    const order = context.$ct.placeOrder(params)

    return order;
  }
}

const useContext = checkoutFactory(factoryParams);
```
