# Integration guide

## Getting stared
Copy `packages/boilerplate` folder and replace all `boilerplate` strings with the name of your platform (for example `commercetools` `about-you`). The strings can be found in imports and `package.json` of every package.

::: tip Test with default theme
Default theme is working out of the box with mocked data from boilerplate so it's a perfect test environment for your integration. Be sure to test it every time you make some changes
:::

Once you copied and renamed the boilerplate run `yarn dev` in your `theme` folder to see if everything works.


## 1. Creating an api-client

Each integration starts with `api-client`. This is one of the packages which is responsible for communication between the Vue Storefront and external API. That's exactly the place where you have to configure your api connection, write your api functions, and expose generated api client to the users.

### 1.1 Configuration
The creation of api client starts with the configuration:

```ts
// api-client/src/configuration.js
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import { apiClientFactory } from '@vue-storefront/core';

interface Config {
  // ...
}

interface API {
  // ..
}

interface OnSetup {
  config: Config;
  client: EcommerceAPI;
}

const onSetup = (config: Config): OnSetup => {
  const client = new EcommerceAPI(config)

  return {
    config,
    client
  };
};

const { createApiClient } = apiClientFactory<Config, API>({
  tag: 'ct',
  onSetup,
  api: {
    getProduct,
    getCategory,
  }
});
```

```ts
// api-client/src/index.js
import { createApiClient } from './configuration';

export { createApiClient }
```

To create api-client you need to call `apiClientFactory`. As a parameters to this deliver a few things:
- `tag` - that's the short name of your integration which will be used to distinguish it among of others
- `onSetup` - optional function that will be called during the creating your api. In this place you can call everything you need to create a connection to the api, such as creating sdk (eg. axios creation), merge given config with the defaults etc.
- `api` - this is the section where you need to pass all of the api function you have created

### 1.2 Api functions
Once you have your configuration created, you can proceed with api functions:

```ts
// api-client/src/api/getProduct.js
const getProduct = (context, params) => {
  const productResponse = await context.client.get(`/product/${params.id}`);

  return productResponse.data
}
```

Each api function always contains `context` as a first parameter. This is the place where you always have access to the client and config of your api connection. Obviously, during the using api client, you will be using these functions without thinking about the context - the vsf core handles this. At the end, you need to provide that function to the api creation logic (section above)

## 2. Creating composables

Composables are the major part of integration. That exactly the place where the business logic comes in. We always serving this package as a integration along with corresponding nuxt module.

### 2.1 Exposing integration plugin wrapper

The first thing that you do, is exposing a nuxt plugin wrapper for creation and configuring your integration by nuxt environment. Within your composables package you have to add these few lines:

```ts
// composables/src/index.js
import { integrationPluginFactory } from '@vue-storefront/core';
import { createApiClient } from '@vue-storefront/commercetools-api';

export const integrationPlugin = integrationPluginFactory(createApiClient);
```

That will expose the integration plugin wrapper, so the nuxt will be able to create your integration within the context or extend already existing one, using a plugin

### 2.2 Creating nuxt module

Inside of the composables packages you have to create another directory, next to `src` called `nuxt`. In that directory we need to place our nuxt module. The nuxt module is taking care of anything you want during the integration to be launched: adding plugins, injecting into build process, creating some aliases and more. In the basic implementation of that module will add just a plugin that will configure our application (using a wrapper that you have already exposed)

Example of plugin
```js
// coposables/nuxt/plugin.js
import { integrationPlugin } from '@vue-storefront/commercetools'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin(({ app, integration }) => {
  const settings = { api: '/graphql', user: 'root' }

  integration.configure({ ...moduleOptions, ...settings })
});
```

The module:
```js
// coposables/nuxt/index.js
export default function (moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
}
```

### 2.2b Extending an existing integration


### 2.3 Writing factory params

Once you have done the essential configuration of nuxt module and plugin, you can proceed to write composable. Obviously you don't have to build it from scratch we do most of the job for you!. Instead, you have to fill required functions and properties called `factoryParams`.

The `factoryParams` are including functions that you have to implement to provide functionality of implementing composable, such a fetching something from the API, or triggering other actions.


```ts
// coposables/src/useCart/index.js

import { useCartFactory, UseCartFactoryParams, Context } from '@vue-storefront/core';

interface Cart { /* ... */ }

interface LineItem { /* ... */}

interface ProductVariant { /* ... */ }

const factoryParams: UseCartFactoryParams<Cart, LineItem, ProductVariant> = {
  loadCart: async (context: Context) => {
    const { data } = await context.$ct.api.getCart();

    return data.cart;
  },
  addToCart: async (context: Context, params) => {
    const { currentCart, product, quantity } = params;
    const { data } = await context.$ct.api.addToCart(loadedCart, product, quantity, customQuery);

    return data.cart;
  },
};

const useCart = useCartFactory(factoryParams);

export default useCart;
```

```ts
// coposables/src/index.js
import useCart from './useCart';

export { useCart }
```

Each function inside of factory params has the context in the very first argument. The second argument contains always the given parameters to the function (eg. product data in adding to cart function)

### 2.3b Creating composables without our factories

Sometimes there is a need when you want to omit using our factories. You can have a really complex integration or you want to follow totally your way of implementing this. In this case, you can still stay stick to the Vue Storefront architecture and create your own composable, by creating your own factory, or even ordinary composable by yourself.

However, you have to keep in mind that you need to handle context and reactive properties as well - Of course you have helpers for that.

```ts
// coposables/src/useCart/index.js
import { vsfRef, generateContext } from '@vue-storefront/core';

const useCart = () => {
  const cart = vsfRef(null, 'my-own-cart')
  const context = generateContext(); // we do the job for you

  const addToCart = async (product) => {
    return context.$ownAPI.updateCart(product)
  }

  return { addToCart, cart }
}
```

## 3. Getters

Our composables always return the properties:

- a field that contains the response - always when you load or modify the state of the given feature, we generate a new response which is being returned by composable. It always has a proper name that refers to the its purpose eg. cart, products, category etc.
- `loading` - field that indicates loading state
- `error` - field that contains errors

As you always have pure response in the first field you need another layer to be agnostic of the platform. We do this by using getters.

Getters are the pure functions that are reading something from given response and returning an agnostic or primitive type.

```js
// coposables/src/getters/index.js
import { CartGetters, AgnosticPrice } from '@vue-storefront/core';

interface LineItem { /* ... */}

const getItems = (cartResponse) => cartResponse.results.lineItems;

const getItemPrice = (lineItem: LineItem): AgnosticPrice => ({
  regular: lineItem.price.amount,
  special: lineItem.price.discounted ? lineItem.price.discounted : 0
});

const getItemName = (lineItem: LineItem): string => lineItem.masterVariant.name;

const getItemQty = (lineItem: LineItem): number => lineItem.quantity;

const cartGetters: CartGetters = {
  getItems,
  getItemPrice,
  getItemName,
  getItemQuantity
}
```

```ts
// coposables/src/index.js
import cartGetters from './getters';

export { cartGetters }
```

## 4. Usage in theme

Well done, you have created everything you need to be integrated with an external API. Now you are able to test it with the UI and display something to the user.

```js
<template>
  <div>
    <div>My cart</div>
    <div v-for="item in items">
      <div>Product name: {{ cartGetters.getItemName(item) }}</div>
      <div>Product price:{{ cartGetters.getItemPrice(item) }} </div>
      <div>Quantity: {{ cartGetters.getItemQuantity(item) }} </div>
    </div>

  </div>
</template>

import { useCart, cartGetters } from '@vue-storefront/your-integration';
import { computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';


export default {
  setup () {
    const { cart, loadCart } = useCart();

    const items = computed(() => cartGetters.getItems(cart.value))

    onSSR(async () => {
      await loadCart()
    })

    return { items, cartGetters }
  }
}
```
