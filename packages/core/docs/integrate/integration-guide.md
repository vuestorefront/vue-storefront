# Integration guide

# Integrating eCommerce platform

::: warning Want to build an integration?
If you want to integrate any eCommerce platform with Vue Storefront please **contact the core team** first. We are eager to help you with building it and ensuring its high quality! Building the integration together with core team is the best way to keep its quality high and make it officially recommended once its done.
:::

Integrating any eCommerce platform with Vue Storefront is a relatively simple process. The only requirement that the eCommerce platform needs to fulfill to be integrated is having a fully functional REST/GraphQL API.

This documentation will guide you through integrating your eCommerce platform with Vue Storefront.

During the process you will make use of two tools:

- **Core** - business logic that is shared between every Vue Storefront integration. It contains utilities and factories for composabless that are ensuring common high-level APIs for each platform.
- **Boilerplate** - boilerplate code of working integration that has hardcoded sample data. It uses core APIs under the hood.

Integration requires three pieces to work:

- **API Client** - a data layer of your application, not used directly in the UI.
- **Composition API functions (aka Composables)** - functions using [Vue Composition API](https://vue-composition-api-rfc.netlify.com/). This is the actual business logic of the integration. It's a mixed logic of core APIs with platform-specific code.
- **Theme** - This is basically a platform-specific part of yout theme that is using agnostic default theme under the hood.
One of the most important requirements for any Vue Storefront integration is to work with a common default theme. This is our way of ensuring that the quality of UI layer, as well as developer experience, remains the same for every integration. Another reason why we are keeping a single theme is that it's much easier to maintain it and keep high quality. You can read more about the default theme [here](/contributing/themes.html). You shouldn't put there anything except plugins and modifications of `nuxt.config.js`

We recommend starting the integration with the API Client. Once you have the required methods and types to interact with eCommerce logic you will have all the tools needed to start building Composition Functions.

:::warning Don't assume someone is using Nuxt!

API Client and Composition API functions should work out of the box in any Vue.js environment (like Vue CLI), you should **never** require Nuxt for them to work
:::

## Scope

Vue Storefront will require **at least** the following features from your eCommerce platform:

**Product**

- fetch single/multiple products based on uuid/sku/catId/query
- fetch product variants

**Category**

- fetch single category
- fetch category tree

**Cart**

- create cart
- add to cart
- remove from cart
- change quantity of item in the cart
- change configuration of item in the cart
- clear cart
- add promo coupon
- remove promo coupon

**User**

- log in
- log out
- register
- forgot password
- add/remove shipping address
- set default shipping address
- add/remove billing address
- set default billing address
- see past orders

**Wishlist**

- add/remove product
- associate with logged in user

**Checkout**

- get shipping methods
- get payment methods
- place order

**i18n**

- change currency
- change locale
- change language

**Additional features (optional)**
- facet filtering
- order notifications


## Getting started

Copy `packages/boilerplate` folder and replace all `boilerplate` strings with the name of your platform (for example `commercetools` `about-you`). The strings can be found in imports and `package.json` of every package.

::: tip Test with default theme
Default theme is working out of the box with mocked data from boilerplate so it's a perfect test environment for your integration. Be sure to test it every time you make some changes
:::

Once you copied and renamed the boilerplate run `yarn dev` in your `theme` folder to see if everything works.


## 1. Creating an api-client

Each integration starts with `api-client`. This is one of the packages which is responsible for communication between the Vue Storefront and external API. That's exactly the place where you have to configure your api connection, write your api functions, and expose generated api client to the users.

Our api client has two parts: the proxy layer (that talks to our middleware) and a direct connection and as result, package of api-client always shares three entrypoints (treeshaking reasons):

- `@vue-storefront/{INTEGRATION}/client` - shares the `createProxyClient` and `integrationPlugin` for proxy
- `@vue-storefront/{INTEGRATION}/server` - shares the `createApiClient` and `integrationPlugin` for direct connection
- `@vue-storefront/{INTEGRATION}` - shares other library stuff, such a helpers, types etc.


### 1.1 Configuration
The creation of an API client starts with the configuration. As we use middleware, this package is splited into three bundles, thus you need to create three separaded files with corresponding configuration:

- `index.client.ts` - contains the creation of api client, to be used only in client side, this one will redirect the functions you created into our middleware
- `index.server.ts` - contains the creation of api client, for direct connection to the integraded platform
- `index.ts` - main entrypoint, that contains everythins else, such as: types, helper functions etc.


```ts
// index.client.ts
import { apiProxyFactory } from '@vue-storefront/core';

const onCreate = (config) => {
  // ...
  return { config };
};

const { createApiProxy, integrationPlugin } = apiProxyFactory({
  tag: 'ct',
  onCreate,
  api: { isGuest }
});

export {
  createApiProxy,
  integrationPlugin
};
```


```ts
// index.server.ts
import * as api from './api';
import { apiClientFactory } from '@vue-storefront/core';

const onCreate = (settings) => {
  const config = { ..setings }
  const client = new ApiConnection()

  return { config, client };
};



const { createApiClient, integrationPlugin } = apiClientFactory({
  tag: 'ct',
  onCreate,
  api,
  extensions: []
});

export {
  createApiClient,
  integrationPlugin
};
```

```ts
// index.ts
export * from './types/Api';
```

To create `api-client` instances you have to use correspoing factory, depending on what api you are creating: proxy or direct one. The creation in both cases in pretty similar, with small differences in the used fields:

- `tag` - that's the short name of your integration which will be used to distinguish it among of others 
- `onCreate` - a function that will be called during creating your API. In this place, you can call everything you need to create a connection to the API, such as creating SDK (eg. axios creation), merge given config with the defaults etc.. This function always returns `client` (connection you created) and `config` or (in case it's proxy) just `config`.
- `api` - this is the section where you need to pass all of the API function you have created (direct) and functions that you don't want to redirect to our middleware (proxy)
- `extensions` - section available only in the direct connection api-client. It allows you to add an api backend extenstions for the api that can add additional features to the integrated platform

### 1.2 API functions
Once you have your configuration created, you can proceed with API functions:

```ts
// api-client/src/api/getProduct.js
const getProduct = (context, params) => {
  const productResponse = await context.client.get(`/product/${params.id}`);

  return productResponse.data
}
```

Each API function always contains `context` as a first parameter. This is the place where you always have access to the client and config of your API connection. Usually, during the using API client, you will be using these functions without thinking about the context - the VSF core handles this. In the end, you need to provide that function to the API creation logic (section above)

## 2. Creating composables

Composables are a major part of the integration. That exactly the place where the business logic comes in. We always serve this package as integration along with the corresponding Nuxt module.
### 2.2 Creating nuxt module

Inside of the composables packages you have to create another directory, next to `src` called `nuxt`. In that directory we need to place our Nuxt module. The Nuxt module is taking care of anything you want during the integration to be launched: adding plugins, injecting into the build process, creating some aliases, and more. The basic implementation of that module will add just a plugin that will configure our application (using a wrapper that you have already exposed)

Example of plugin
```js
// composables/nuxt/plugin.js
import { integrationPlugin } from '@vue-storefront/commercetools-api/client'

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin(({ app, integration }) => {
  const settings = { api: '/graphql', user: 'root' }

  integration.configure({ ...moduleOptions, ...settings })
});
```

The module:
```js
// composables/nuxt/index.js
export default function (moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
}
```

### 2.2b Extending an existing integration

Sometimes you don't want to create a new integration, instead, you need to extend an existing one. You can achieve that by using integration plugin that integrations share for us, but this time `configure` call is being replaced by `extend`.

```js
// coposables/nuxt/plugin.js
import { integrationPlugin } from '@vue-storefront/commercetools'
import { getCart } from '@vue-storefront/your-integration-package';

export default integrationPlugin(({ app, integration }) => {
  const api = {
    getCart
  }

  integration.extend({ api })
});
```

The `extend` is an special function that allows you to extend an existing integration. Based on the fields you give as arguments the extending will go in the following way:

- when you pass `api` object - the function you used will be merged to the ones in the current integration with applied context
- when you pass `config` object - it will be merged with the existing one, so given functions in the `api` section will have access to this
- when you pass any other key - it will be assigned directly as subfield in the context (eg. `$ct.yourField`).

After extending, you can use a new API, in the same way as the one configured for the first time.

### 2.3 Writing factory params

Once you have done the essential configuration of the Nuxt module and plugin, you can proceed to write composable. A good thing to know is you don't have to build it from scratch, we do most of the job for you! Instead, you have to fill in the required functions and properties called `factoryParams`.

The `factoryParams` are including functions that you have to implement to provide functionality of implementing composable, such a fetching something from the API, or triggering other actions.


```ts
// composables/src/useCart/index.js

import { useCartFactory, UseCartFactoryParams, Context } from '@vue-storefront/core';

interface Cart { /* ... */ }

interface LineItem { /* ... */}

interface ProductVariant { /* ... */ }

const factoryParams: UseCartFactoryParams<Cart, LineItem, ProductVariant> = {
  load: async (context: Context) => {
    const { data } = await context.$ct.api.getCart();

    return data.cart;
  },
  addItem: async (context: Context, params) => {
    const { currentCart, product, quantity } = params;
    const { data } = await context.$ct.api.addToCart(loadedCart, product, quantity, customQuery);

    return data.cart;
  },
};

const useCart = useCartFactory(factoryParams);

export default useCart;
```

```ts
// composables/src/index.js
import useCart from './useCart';

export { useCart }
```

Each function inside of factory params has the context in the very first argument. The second argument always contains the given parameters to the function (eg. product data in adding to cart function)

### 2.3b Composable dependencies

Sometimes there is a need to use other composable inside of new one as dependency. We also allow you to do this by using special function in the factory params - `setup`. This function is being called inside of the composable and the return values are available in the context:

```ts
import { useCart } from '@vue-storefront/commercetools';

interface UserContext extends Context {
  setUser: (user) => void;
}

const factoryParams: UseUserFactoryParams = {
  setup() {
    return useCart();
  },
  load: async (context: UserContext) => {
    const { data } = await context.$ct.api.getUser();

    context.setCart(data.activeCart);

    return data.user;
  },

};
```

### 2.3c Creating composables without our factories

Sometimes there you need to omit using our factories. You can have a really complex integration or you want to follow totally your way of implementing this. In this case, you can still stay stick to the Vue Storefront architecture and create your own composable, by creating your own factory, or even ordinary composable by yourself.

However, you have to keep in mind that you need to handle context and reactive properties as well - of course you have helpers for that.

```ts
// composables/src/useCart/index.js
import { vsfRef, generateContext } from '@vue-storefront/core';

const useCart = () => {
  const cart = vsfRef(null, 'my-own-cart')
  const context = generateContext(); // we do the job for you

  const addToCart = async ({ product }) => {
    return context.$ownAPI.updateCart(product)
  }

  return { addToCart, cart }
}
```

## 3. Getters

Our composables always return the following properties:

- a field that contains the response - when you load or modify the state of the given feature, we generate a new response that is being returned by composable. It always has a proper name that refers to its purpose eg. cart, products, category etc.
- `loading` - field that indicates loading state
- `error` - field that contains errors

As you always have a pure response in the first field you need another layer to be agnostic of the platform. We do this by using getters.

Getters are the pure functions that are reading something from given response and returning an agnostic or primitive type.

```js
// composables/src/getters/index.js
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
// composables/src/index.js
import cartGetters from './getters';

export { cartGetters }
```

## 4. Usage in theme

Well done, you have created everything you need to be integrated with an external API! Now you are able to test it with the UI and display something to the user.

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
    const { cart, load: loadCart } = useCart();

    const items = computed(() => cartGetters.getItems(cart.value))

    onSSR(async () => {
      await loadCart()
    })

    return { items, cartGetters }
  }
}
```
