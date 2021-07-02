# Integration guide

:::danger Don't forget to reload the application
The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.
:::

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, please **contact the core team on our [Discord](https://discord.vuestorefront.io) server**. We are eager to help you to ensure its high quality and maybe even officially recommended it 😉
:::

[[toc]]

## Introduction

Integrating an eCommerce platform with Vue Storefront sounds scary. Luckily, some of our partners and community members with different seniority levels have successfully done it. We are sure that even without prior experience with Vue Storefront, you can too.

This tutorial will guide you through the process of creating integration and explain the concepts behind Vue Storefront.

## Requirements

Before we get started, make sure that:

- platform you want to integrate has REST or GraphQL API,
- you have installed [Node 10+](https://nodejs.org/en/), [Yarn 1](https://classic.yarnpkg.com/lang/en/) and [Git](https://git-scm.com/),
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

Out of the box, the `theme` directory doesn't contain much - just a few configuration files and empty directories. However, this doesn't mean that you have to create the whole theme from scratch. When your integration is ready, you will use our CLI to combine this project with our base theme to create a new Nuxt.js application with all necessary pieces inside.

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

- `@sloth/theme`,
- `@sloth/api`,
- `@sloth/sloth`.

:::tip
It's a convention to call `composables` package with just a name of the platform because this is the package that developers use the most with when creating a shop. Example of this is `@vue-storefront/commercetools`, `@vue-storefront/magento` and `@vue-storefront/shopify`.
:::

Open `packages/composables/nuxt/plugin.js` and change `boilerplate` to the name of your integration. This name should not contain any special characters nor spaces. In our case, it's lowercase `sloth`.

Open `packages/theme/middleware.config.js` and change `boilerplate` with the same name.

### Install dependencies

After renaming all packages, we can safely install dependencies and not worry about dependencies linking.

Open the terminal in the root of the repository and run `yarn install`.

### Test it

Once dependencies are installed, run `yarn build`, then `yarn dev`. Open the link shown in the terminal and test the page to confirm it's working.

Since we are mocking all functionalities in the boilerplate, different parts of the application might not update properly (e.g., the cart). However, when you open different pages and click different buttons, **you should not see any errors in the terminal or browser console**. You might see some warnings about missing translations (starting with `[vue-i18n]`), but you don't have to worry about it now.

Once you confirmed that everything is working, commit the changes.

## Connecting to the platform

Let's start by creating an API client that will talk to the API. As mentioned above, `api-client` project connects to the eCommerce platforms, so this is the project to update.

### Structure of the `api-client` project

When you open `packages/api-client/src` folder, you will see only two files and one empty folder. TThat's not a lot, considering how much code some Node.js servers need, but thanks to abstractions we created, you don't seen more. So what are these files for?

- `index.ts` is a file that should **not** contain any server-side code but export things that `composables` or `theme` projects might need. Great examples are integration-specific TypeScript types for request and response bodies or helper functions.
- `index.server.ts` is a file that contains server-side code. Inside of it `apiClientFactory` creates `createApiClient` method and exports it. Server Middleware calls this method on every request to create a fresh API client and to handle integration-specific endpoints.

### Adding API client

API client is a library that handles sending requests to and handling responses from the eCommerce platform.

:::warning
Examples below use `axios` to handle HTTP requests. However, you can use other libraries if your platform uses GraphQL or has its own dedicated clients.
:::

In terminal, go to `packages/api-client` and install `axios`:

```bash
cd packages/api-client
yarn add axios
```

Now in the code editor, open `packages/api-client/src/index.server.ts`. Inside of it, there is the `onCreate` method.

`onCreate` accepts the `settings` parameter, which is a configuration provided in `packages/theme/middleware.config.js`. By default, it's an empty object, but can by any configuration you need.

`onCreate` returns an object with at least `config` and `client` properties, but can have any number of custom properties if needed. This object is later available in API endpoints.

Let's update `onCreate` method to create and return new Axios instance.

```typescript
// packages/api-client/index.server.ts
import axios from 'axios';

const onCreate = (settings) => {
  const client = axios.create({
    baseURL: settings.api.url
  });

  return {
    config: settings,
    client
  };
};
```

In the example above we passed `settings.api.url` to `axios.create`, but it's not defined in `middleware.config.js`. Let's add it:

```javascript
// packages/theme/middleware.config.js
module.exports = {
  integrations: {
    sloth: { // name of your integration
      location: '@sloth/api/server', // name of your api-client package followed by `/server`
      configuration: {
        api: {
          url: '' // URL of your eCommerce platform
        }
      }
    }
  }
};
```

## Implementing `useProduct` functionality

It's impossible to write tutorial explaining how to implement each and every composable, especially because some of them might differ wildly between the platforms. For this reason we will explain how to implement `useProduct` composable and `productGetters` and leave the rest to you.

### Understanding composables

Before implementing any composable, you should get familiar with it's TypeScript interfaces.

Let's start with the [UseProduct interface](../core/api-reference/core.useproduct) (note the capital `U`). It uses [Typescript generics](https://www.typescriptlang.org/docs/handbook/2/generics.html). The reason is that we want to provide great development experience by providing types for the data stored in and returned from composables. However, each platform has a unique data structure and we don't want to make any assumptions. That's why it's up to integrators to provide the types.

`UseProduct` accepts two generics:
- `PRODUCTS` that represents the structure of the products returned by the API,
- `PRODUCT_SEARCH_PARAMS` that represents parameters accepted by the `search` method.

It also has 3 properties and method called `search`. Fortunately we don't have to create them ourselves for every composable. All composables are created using [factories](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)), which accept an object that holds logic for composable methods. **Factory will take care of creating all properties, methods and even handling errors and loading state, so you can just focus on integrating it with the API.**

### Implementing `useProduct` composable

Now, when we understand how composables are created, let's see what parameters does the `useProduct` factory expect. Because this composable is fairly small and has only one method, the [UseProductFactoryParams interface](../core/api-reference/core.useproductfactoryparams.html) also expects one handler - `productsSearch`.

Open `packages/composables/src/useProduct/index.ts`. This file already calls `useProductFactory` and passes `params` matching above interface. With this done, the only thing left is to implement this method.

Every method in `factoryParams` has at least one argument called [context](../core/api-reference/core.integrationcontext). Second, optional argument is an object holding parameters passed to composable method and [customQuery](../core/api-reference/core.customquery).


Remove placeholder code from `productsSearch` method and add the following:

```typescript
// Replace `sloth` with the name of your package defined in `packages/composables/nuxt/plugin.js`
const { data } = await context.$sloth.api.getProduct(params);

return data;
```

This calls API endpoint called `getProduct`. It doesn't exist yet, so let's create it.

:::tip Passing parameters to the API
An HTTP request is sent to the Server Middleware whenever any method in `context.$sloth.api` object is called. Additionally, all parameters passed to them will be included in the payload. Sending too much data may result in poor performance, so try to pass as few parameters as possible.
:::

### Understanding `api-client`

In the previous section we added a call to `getProduct` endpoint. Before we implement this endpoint, you should understand why we need `api-client`.

As mentioned in [Project structure](#project-structure) section, `api-client` is a server that acts as a proxy. All requests to and from various APIs pass through it. You might be wondering why we choose this architecture. Theoretically calling APIs directly from the browser would result in a better performance.

While this might be true for simple scenarios, it doesn't scale well. Some of the benefits of using such proxy are:

- **Caching** - selected responses can be cached to signigicantly improve the performance. While it's possible to do caching in the browser, each customer have to make at least one request to a given endpoint.
- **Lower cost** - when responses are cached, fewer requests are sent to the eCommerce platform. Depending on the provider, it might reduce the cost.
- **Smaller bundle** - with all the clients installed and configured on the server, the final bundle sent to the browsers can be much smaller. This is especially true for APIs based on GraphQL.
- **Security** - API configuration, secrets and keys are stored on the server and are not sent to the browser.

### Implementing `getProduct` api endpoint

Create new file called `getProduct.ts` in `packages/api-client/src/api` folder. Inside of it, add the following function:

```typescript
export async function getProduct(context, params) {

}
```

This function has two arguments:
- `context` which includes:
  - `config` - integration configuration,
  - `client` - API client created in `packages/api-client/src/index.server.ts`,
  - `req` - HTTP request object,
  - `res` - HTTP response object,
  - `extensions` - extensions registered within integration,
  - `customQueries` - custom GraphQL queries registered within integration (used only with GraphQL),
  - `extendQuery` - helper function for handling custom queries (used only with GraphQL).
- `params` - parameters passed from composable.

We can call platform API using `config` and `client` properties in `context` and data from `params`.

In the example below we use `axios` instance created below to call `products` API. This is just an example and you should modify it to fit your integration:

```typescript
export async function getProduct(context, params) {
  // Create URL object containing full endpoint URL
  const url = new URL('/products', context.config.api.url);

  // Add parameters passed from composable as query strings to the URL
  params.id && url.searchParams.set('id', params.id);
  params.catId && url.searchParams.set('catId', params.catId);
  params.limit && url.searchParams.set('limit', params.limit);

  // Use axios to send a GET request
  const { data } = await context.client.get(url.href);

  // Return data from the API
  return data;
}
```

### Understanding getters

Now, that we can request and save API data, we need to display it to the user. Every integration can use and extend our base theme for that. However, accessing the data straight from integrations isn't possible, because each of them uses unique data structures. To do that, we need getters.

Getters allow us to take raw response from the API and map or extract data to common format, which then can be used in the template.

### Implementing `productGetters`

Open `packages/composables/src/getters/productGetters.ts`. There is a bunch of functions returned in a single object. Each of them has at least one argument, which is either a raw response from the API (`products`) or single item extracted from it (`product`).

Although types of arguments are unknown and specific to your integration, return types are already define and must match those defined in [ProductGetters interface](../core/api-reference/core.productgetters.html).

You need to implement all of these functions and if necessary add your own.


## Creating a theme

In the default theme, some components used to display or modify integration-specific data, like forms or checkout information are blank. 

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


-----------------------------------------------------------------------
-----------------------------------------------------------------------
-----------------------------------------------------------------------


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
