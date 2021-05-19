# Integration guide

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, please **contact the core team on our [Discord](https://discord.vuestorefront.io) server**. We are eager to help you to ensure its high quality and maybe even officially recommended it 😉
:::

## Introduction

Integrating an eCommerce platform with Vue Storefront sounds scary. Luckily, some of our partners and community members with different seniority levels have successfully done it. We are sure that even without prior experience with Vue Storefront, you can too.

This tutorial will guide you through the process of creating integration and explain the concepts behind Vue Storefront.

## Requirements

Before we get started, make sure that:

- platform you want to integrate has REST or GraphQL API,
- you have installed [Node 10+](https://nodejs.org/en/) and [Yarn 1](https://classic.yarnpkg.com/lang/en/),
- you are familiar with JavaScript and (optionally) TypeScript,
- you are familiar with [Composables and Composition API](../guide/composables).

## Project structure

To make it easy to get started, we created an [eCommerce integration boilerplate](https://github.com/vuestorefront/ecommerce-integration-boilerplate).

It is a monorepo, which is a fancy word to describe a single repository containing multiple related projects. Each directory inside `packages` contains one project. There are 3 projects:

- `api-client`,
- `composables`,
- `theme`.

### API client

This project is the **_server layer_** that extends our [Server Middleware](../advanced/server-middleware.html). It creates an API client (like `Apollo` for GraphQL or `Axios` for plain HTTP) that communicates with your eCommerce platform. It acts as a proxy between the users and the platform.

Here, you will create new endpoints that accept parameters from the frontend and use them to fetch data.

### Composables

This project consists of two parts:

- [Composables](../guide/composables) that manage the state, prepare and send the request to the `api-client`, then save the response. If necessary, they also parse and format the response for getters.

- [Getters](../guide/getters) that extract information from the responses provided by `composables` in formatted and agnostic format.

Here, you will create new methods for `composables` to fetch the data and new `getters` to extract different pieces of information from that data.

### Theme

This project is a template for generating new Vue Storefront shops. It's a [Nuxt.js](https://nuxtjs.org/) application that contains pages, Vue components, and assets. It uses `composables` to interact with the platform and `getters` to display the data to the user. 

Out of the box, the `theme` directory doesn't contain much - just a few configuration files and empty directories. However, this doesn't mean that you have to create the whole theme from scratch. When your integration is ready, you will use our CLI to combine this project with our base theme to create a new Nuxt.js application with all pieces inside.

Here, you will create new components, scripts, and assets to override or extends our base theme.

## Scope

The default theme in Vue Storefront comes with support for plenty of functionalities out of the box, which is great if you don't want to deal with the UI or styling. However, this comes at a cost. The fewer functionalities your platform supports, the more overriding it requires.

It's hard to list all functionalities your platform should support, but you can get a general idea by browsing individual composables in [`packages/composables/src` folder](https://github.com/vuestorefront/ecommerce-integration-boilerplate/tree/master/packages/composables/src) in boilerplate repository. For example [`useCart` composable](https://github.com/vuestorefront/ecommerce-integration-boilerplate/blob/master/packages/composables/src/useCart/index.ts) has following handlers:

- `load`,
- `addItem`,
- `removeItem`,
- `updateItemQty`,
- `clear`,
- `applyCoupon`,
- `removeCoupon`,
- `isInCart`.

API of your platform should have endpoints for most of these operations, unless some of them can be performed on the frontend. One such example would be `isInCart`, which accepts `currentCart` and `product` as parameters. In most cases this is enough information to check if product is already in cart, without calling an API.

## Getting started

### Fork boilerplate repository

Now that we explained the basics let's start creating an integration. Open the [eCommerce integration boilerplate repository](https://github.com/vuestorefront/ecommerce-integration-boilerplate) and click `Use this template` button to fork it. This creates a copy of a repository and allows you to experiment with changes without affecting the original project.  Enter the name of the new repository and click `Create repository from template`.

Once the new repository is ready, clone it locally.

### Name your project

**Before you start making changes and installing dependencies**, let's update the name of the packages and integrations. Doing it now prevents issues with linking dependencies later.

Search for all instances of these strings (in this order) and change them to match your integration:

- `@vue-storefront/boilerplate-theme`,
- `@vue-storefront/boilerplate-api`,
- `@vue-storefront/boilerplate`.

For the sake of example and simplicity, let's assume our eCommerce platform is called **Sloth**. From now on, we will refer to these packages as:

- `@example/theme`,
- `@example/api`,
- `@example/sloth`.

:::tip
It's a convention to call `composables` package with just a name of the platform because this is the package that developers mostly interact with when creating a shop. Example of this is `@vue-storefront/commercetools`, `@vue-storefront/magento` and `@vue-storefront/shopify`.
:::

Open `packages/composables/nuxt/plugin.js` and change `boilerplate` to the name of your integration. This name should not contain any special characters nor spaces. In our case, it's lowercase `sloth`.

Open `packages/theme/middleware.config.js` and change `boilerplate` with the same name.

### Install dependencies

After renaming all packages, we can safely install dependencies and not worry about dependencies linking.

Open the terminal in the root of the repository and run `yarn install`.

### Test the project

Once dependencies are installed, run `yarn build`, then `yarn dev`. Open the link shown in the terminal and test the page to confirm it's working.

Since we are mocking all functionalities in the boilerplate, different parts of the application might not update properly (e.g., the cart). However, when you open different pages and click different buttons, **you should not see any errors in the terminal or browser console**. You might see some warnings about missing translations (starting with `[vue-i18n]`), but you don't have to worry about it now.

Once you confirmed that everything is working, commit the changes.

## Connecting to the platform

Let's start by creating an API client that will talk to the API. As mentioned above, `api-client` project connects to the eCommerce platforms, so open `packages/api-client/src/index.server.ts`.

GraphQL example https://github.com/vuestorefront/commercetools

## Implementing `useProduct`

It's impossible to write tutorial explaining how to implement each and every composable, especially because some of them might differ wildly between the platforms. 



-----------------------------------------------------------------------
-----------------------------------------------------------------------
-----------------------------------------------------------------------
TODO: Explain how and why each package uses the `core`
-----------------------------------------------------------------------
-----------------------------------------------------------------------
-----------------------------------------------------------------------


## Creating an api-client

Each integration starts with `api-client`. This is one of the packages which is responsible for communication between the Vue Storefront and external API. That's exactly the place where you have to configure your API connection, write your API functions, and expose generated API client to the users.

Our API client always shares two entry points:

- `@vue-storefront/{INTEGRATION}/server` - shares the `createApiClient`.
- `@vue-storefront/{INTEGRATION}` - shares other library code, such as helpers, types etc.


### Configuration
The creation of an API client starts with the configuration. As we use middleware, this package is split into two bundles, thus you need to create two separate files with the corresponding configuration:

- `index.server.ts` - contains the creation of API client, for direct connection to the integrated platform
- `index.ts` - main entry point, that contains everything else, such as types, helper functions etc.

```ts
// index.server.ts
import * as api from './api';
import { apiClientFactory } from '@vue-storefront/core';

const onCreate = (settings) => {
  const config = { ..setings }
  const client = new ApiConnection()

  return { config, client };
};



const { createApiClient } = apiClientFactory({
  onCreate,
  api,
  extensions: []
});

export {
  createApiClient
};
```

```ts
// index.ts
export * from './types/Api';
```

To create `api-client` instances you have to use the corresponding factory, depending on what API you are creating: proxy or direct one. The creation in both cases is pretty similar, with small differences in the used fields:

- `onCreate` - a function that will be called during creating your API. In this place, you can call everything you need to create a connection to the API, such as creating SDK (eg. axios creation), merge given config with the defaults etc. This function always returns `client` (connection you created) and `config` or (in case it's proxy) just `config`.
- `api` - this is the section where you need to pass all of the API function you have created (direct) and functions that you don't want to redirect to our middleware (proxy)
- `extensions` - section available only in the direct connection api-client. It allows you to add an API backend extension for the API that can add additional features to the integrated platform

### API functions
Once you have your configuration created, you can proceed with API functions:

```ts
// api-client/src/api/getProduct.js
const getProduct = async (context, params) => {
  const productResponse = await context.client.get(`/product/${params.id}`);

  return productResponse.data
}
```

Each API function always contains `context` as a first parameter. This is the place where you always have access to the client and config of your API connection. Usually, during the using API client, you will be using these functions without thinking about the context - the VSF core handles this. In the end, you need to provide that function to the API creation logic (section above)

### GraphQL `customQuery` support

Vue Storefront provides an approach to dynamically change the default predefined graphQL queries for each api request out of the box. The `context` parameter of the API method has `extendQuery` function that can be used to modify qraphQL queries using custom modifier functions. Each custom query modifier lives in the `middleware.config.js`.

```js
module.exports = {
  integrations: {
    ['<INTEGRATION_TAG>']: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: { /* ... */ },
      customQueries: {
        'custom-query-modifier': ({ query, variables }) => {
          variables.locale = 'en'
          return { query, variables }
        }
      }
    }
  }
};
```

The custom query modifier function always has in the arguments the default query and default variables and must return the query and its variables as well. In the body you can do anything you want with those parameters - you can override them or even change to the new ones. After creating the modifier function, you can use `extendQuery` to change the default query from middleware api method by providing `customQuery` object parameter that contains the query name as key and the identifier of the modifier function as value from client-side api method call. `extendQuery` function will produce modified query using specified modifier function that can be used to fetch required data.

```ts
// api-client/src/api/getProduct
const getProduct = async (context: Context, params: PARAMS, customQuery: Record<string, string>) => {
  const { products } = context.extendQuery(
    customQuery, { products: { query: defaultQuery, variables: defaultVariables } }
  );

  return context.client({
    query: gql`${products.query}`,
    variables: products.variables,
  });
};
```

Proxied version of this api method can be used within composable method with `customQuery` support. Now you can modify grapGL queries by providing modifier function identifier to composable method inside component setup function.

```ts
// composables/src/useProduct
const productFactoryParams: UseProductFactoryParams<PRODUCTS, PRODUCT_SEARCH_PARAMS> = {
  async productSearch (context: Context, params: PRODUCT_SEARCH_PARAMS & { customQuery?: CustomQuery }) {
    const { customQuery, ...searchParams } = params;
    const product = await context['<INTEGRATION_TAG>'].api.getProduct(searchParams, customQuery)
    return product
  }
}
```

```ts
// theme/pages/Product.vue
import { useProduct } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core`

export default {
  setup() {
    const { products, search} = useProduct('<PRODUCT_ID>');

    onSSR(async () => {
      await search({ customQuery: { products: 'custom-query-modifier' }})
    })

    return {
      products
    };
  }
};

```

This approach gives you the flexibility to manage qraphQL queries from the client side without increasing the bundle size with qraphQL libraries and queries.

## Creating composables

Composables are a major part of the integration. That exactly the place where the business logic comes in. We always serve this package as integration along with the corresponding Nuxt module.
### Creating nuxt module

Inside of the composables packages you have to create another directory, next to `src` called `nuxt`. In that directory, we need to place our Nuxt module. The Nuxt module is taking care of anything you want during the integration to be launched: adding plugins, injecting into the build process, creating some aliases, and more. The basic implementation of that module will add just a plugin that will configure our application (using a wrapper that you have already exposed)

Example of plugin
```js
// composables/nuxt/plugin.js
import { integrationPlugin } from '@vue-storefront/core'

const moduleOptions = <%= serialize(options) %>;

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

### Writing factory params

Once you have done the essential configuration of the Nuxt module and plugin, you can proceed to write composable. A good thing to know is you don't have to build it from scratch, we do most of the job for you! Instead, you have to fill in the required functions and properties called `factoryParams`.

The `factoryParams` are including functions that you have to implement to provide the functionality of implementing composable, such a fetching something from the API, or triggering other actions.


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

### Composable dependencies

Sometimes there is a need to use another composable inside of a new one as a dependency. We also allow you to do this by using a special function in the factory params - `provide`. This function is being called inside of the composable and the return values are available in the context:

```ts
import { useCart } from '@vue-storefront/commercetools';

interface UserContext extends Context {
  setUser: (user) => void;
}

const factoryParams: UseUserFactoryParams = {
  provide() {
    return useCart();
  },
  load: async (context: UserContext) => {
    const { data } = await context.$ct.api.getUser();

    context.setCart(data.activeCart);

    return data.user;
  },

};
```

### Creating composables without VSF factories

Sometimes you need to omit using VSF factories. You can have a complex integration or decide to follow your way of implementing it. In this case, you can use Vue Storefront architecture and create your own composable, by creating a custom factory, or not using one at all.

However, you have to keep in mind that you need to handle context and reactive properties as well - of course, there are helpers for that.

```ts
// composables/src/useCart/index.js
import { vsfRef, useVSFContext } from '@vue-storefront/core';

const useCart = () => {
  const cart = vsfRef(null, 'my-own-cart')
  const context = useVSFContext();

  const addToCart = async ({ product }) => {
    return context.$ownAPI.updateCart(product)
  }

  return { addToCart, cart }
}
```

## Creating getters

Our composables always return the following properties:

- a field containing the API response - when you load or modify the state of the given feature, we generate a new response that is being returned by composable. It always has a proper name that refers to its purpose eg. cart, products, category etc.
- `loading` - a field indicating loading state
- `error` - a field containing errors

As you always have a pure response in the first field you need another layer to be agnostic of the platform. We do this by using getters.

Getters are the pure functions that are reading something from the given response and returning an agnostic or primitive type.

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

## Creating a theme

In the default theme, components used to display or modify integration-specific data, like forms or checkout information are blank. This is because each integration might use different data formats and properties.

You need to create few Vue components and JavaScript files:

| Component                                    | Props                               | Emits event |
|----------------------------------------------|-------------------------------------|-------------|
| components/UserBillingAddress.vue            | { address: Object }                 |             |
| components/UserShippingAddress.vue           | { address: Object }                 |             |
| components/Checkout/CartPreview.vue          |                                     |             |
| components/MyAccount/BillingAddressForm.vue  | { address: Object, isNew: Boolean } | ✔           |
| components/MyAccount/ShippingAddressForm.vue | { address: Object, isNew: Boolean } | ✔           |
| components/MyAccount/PasswordResetForm.vue   |                                     | ✔           |
| components/MyAccount/ProfileUpdateForm.vue   |                                     | ✔           |
| composables/useUiHelpers/index.ts            |                                     |             |
| middleware/is-authenticated.js               |                                     |             |

### Creating Vue components

Components that emit events are forms. Event should be in the following format:

```js
emit('submit', {
  form: Object,
  onComplete: (data: any) => {},
  onError: (error: Error) => {}
})
```

When such an event is sent, the application will handle communication with the API. If the request is successful, `onComplete` callback will be called with the response from the API. Otherwise, `onError` will be called with the error caught.

### Creating a middleware

`is-authenticated` middleware is used to prevent access to the page for guest users. It's used on pages such as user profile.

```js
export default {
  middleware: [
    'is-authenticated'
  ]
}
```

Please refer to [Nuxt.js middleware documentation](https://nuxtjs.org/docs/2.x/directory-structure/middleware/) for more information.
