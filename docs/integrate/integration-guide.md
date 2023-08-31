# Integrating e-commerce platform

:::danger Don't forget to reload the application
The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.
:::

::: warning Want to build an integration?
If you want to integrate with Vue Storefront, don't hesitate to get in touch with the core team on our [Discord](https://discord.vuestorefront.io/) server. We are eager to help you to ensure its high quality and maybe even officially recommend it 😉
:::

## Introduction

Integrating an e-commerce platform with Vue Storefront sounds scary. Luckily, many of our partners and community members with different seniority levels have successfully done it. We are sure that even without prior experience with Vue Storefront, you can too.

This document will guide you through the process of creating integration and explain the concepts behind Vue Storefront.

## Requirements

Before we get started, make sure that:

- platform you want to integrate has REST or GraphQL API,
- you have installed [Node 12](https://nodejs.org/en/), [Yarn 1](https://classic.yarnpkg.com/lang/en/) and [Git](https://git-scm.com/),
- you are familiar with JavaScript and TypeScript,
- you are familiar with [Composition API](../composition/composition-api.html) and [Composables](../composition/composables.html).

## Project structure

To make it easy to get started, we created an [e-commerce integration boilerplate](https://github.com/vuestorefront/ecommerce-integration-boilerplate).

It's a monorepo, which is a single repository containing multiple related projects. Each directory inside `packages` contains one project. There are three projects:

- `api-client`,
- `composables`,
- `theme`.

### API client

`api-client` is the **_server layer_** that extends our [Server Middleware](../architecture/server-middleware.html). It creates an API client (like `Apollo` for GraphQL or `Axios` for plain HTTP) that communicates with your e-commerce platform. It acts as a proxy between the users and the platform.

Here, you will create new endpoints that accept parameters sent from the frontend and use them to fetch or submit data to the platform.

### Composables

`composables` consists of two parts:

- [Composables](../composition/composables.html) manage the state, prepare and send the request to the `api-client`, then save the response. If necessary, they also modify the response to simplify getters.

- [Getters](../composition/getters.html) extract data from API responses provided by `composables` and return them in formatted and agnostic form.

Here, you will create new methods for `composables` to fetch the data and new `getters` to extract different pieces of information from that data.

### Theme

This project is a template for generating new Vue Storefront shops. It's a [Nuxt.js](https://nuxtjs.org/) application that contains pages, Vue components, and assets. It uses `composables` to interact with the platform and `getters` to display the data to the user. 

Out of the box, the `theme` project doesn't contain much - just a few configuration files and empty directories. However, this doesn't mean that you have to create the whole theme from scratch. When your integration is ready, you can use our CLI to combine this project with our base theme to generate a new Nuxt.js application with all necessary pieces inside.

Here, you will create new components, scripts, and assets to override or extend our base theme.

## Scope

The default theme in Vue Storefront comes with support for many functionalities out of the box, which is excellent if you don't want to deal with the UI or styling. However, this comes at a cost. The fewer functionalities your platform supports, the more overriding it requires.

It's hard to list all functionalities your platform should support. Still, you can get a general idea by browsing individual composables in the [`packages/composables/src` folder](https://github.com/vuestorefront/ecommerce-integration-boilerplate/tree/master/packages/composables/src) in the boilerplate repository. For example, [`useCart` composable](https://github.com/vuestorefront/ecommerce-integration-boilerplate/blob/master/packages/composables/src/useCart/index.ts) has the following handlers:

- `load`,
- `addItem`,
- `removeItem`,
- `updateItemQty`,
- `clear`,
- `applyCoupon`,
- `removeCoupon`,
- `isInCart`.

API of your platform should have endpoints for most of these operations unless some can be performed on the frontend. One such example would be `isInCart`, which accepts `currentCart` and `product` as parameters. In most cases, this is enough information to check if the product is already in the cart without calling the API.

## Getting started

### Fork boilerplate repository

Now that we explained the basics, let's start creating an integration. Open the [e-commerce integration boilerplate repository](https://github.com/vuestorefront/ecommerce-integration-boilerplate) and click the `Use this template` button. This creates a copy of a repository and allows you to make changes without affecting the original project. Enter the name of the new repository and click `Create repository from template`.

Once the new repository is ready, clone it locally.

### Name your project

**Before you start making changes and installing dependencies**, let's update the name of the packages and integrations. Doing it now prevents issues with linking dependencies later.

Open the "Search and Replace" tool inside your code editor and replace all instances of `__replace_me__` with the name of your project or platform. The name must be in lowercase, without spaces or any special characters.

### Install dependencies

After renaming all packages, we can safely install dependencies and not worry about dependencies linking.

Open the terminal in the root of the repository and run:

```bash
yarn install
```

### Test it

Once dependencies are installed, run `yarn build`, then `yarn dev`. Open the link shown in the terminal and test the page to confirm it's working.

Since we are mocking all functionalities in the boilerplate, different parts of the application might not update properly (e.g., the cart). However, you should not see any errors in the terminal or browser console when you open different pages and click various buttons. You might see some warnings about missing translations (starting with `[vue-i18n]`), but you don't have to worry about them now.

## Connect to the platform

Let's start by creating an API client that will communicate with the e-commerce platform. As mentioned above, the `api-client` does precisely that, so this is the project to update.

### Structure of the `api-client` project

You will see only two files and one empty directory when you open the `packages/api-client/src` folder. That's not a lot, considering how much code some Node.js servers need, but thanks to abstractions we created, you don't need more. So what are these files for?

- `index.ts` is a file that should **not** contain any server-side code but export things that `composables` or `theme` projects might need. Great examples are integration-specific TypeScript types for request and response bodies or helper functions.
- `index.server.ts` is a file that contains server-side code. Inside of it `apiClientFactory` creates `createApiClient` method and exports it. Server Middleware calls this method on every request to create a fresh API client and to handle integration-specific endpoints.

### Add API client

API client is a library that handles sending requests to the e-commerce platform and parsing its responses.

:::warning
Examples below use `axios` to handle HTTP requests. However, you can use other libraries if your platform uses GraphQL or has dedicated clients.
:::

In terminal, go to `packages/api-client` and install `axios`:

```bash
cd packages/api-client
yarn add axios
```

There are two functions you can use to create the client:
- The `onCreate` is called on every request. You can use it to customize the request, response, or settings.
- The `init` is called once on the middleware setup. You can use it to set up the GraphQL or axios client instance.

Now in the code editor, open `packages/api-client/src/index.server.ts`. Inside of it, there is the `onCreate` method.

`onCreate` accepts the `settings` parameter, which is a configuration provided in `packages/theme/middleware.config.js`. By default, it's an empty object but can be any configuration you need.

`onCreate` must return an object with at least `config` and `client` properties but it can have any number of custom properties if needed. This object is later available in API endpoints.


Let's update the `onCreate` method to return `config` and `client` and execute the `init` function if the application did not initialize that client.

```typescript
// packages/api-client/index.server.ts
function onCreate(settings) {
  if (!settings?.client) {
    return init(settings);
  }

  return {
    config: settings,
    client: settings.client
  };
}
```

Now let's implement the `init` function. It can return any result, and the server will merge it into the configuration object. For our purpose, we'll return our API Client settings and the `axios` client instance.

```typescript
// packages/api-client/index.server.ts
import axios from 'axios';

const init = (settings) => {
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
          url: '' // URL of your e-commerce platform
        }
      }
    }
  }
};
```

As a final step, we must export the `init` function so the Server Middleware can execute it on setup. At the very bottom, add `init` below `createApiClient` to the exported object.

```typescript
export {
  createApiClient
  init // export init function
};
```

## Implement `useProduct` functionality

It would be impossible to write a tutorial for implementing every composable because some might differ wildly between the platforms. For this reason, we will explain how they work and show you how to implement them on the example of `useProduct` composable, `getProduct` API endpoint, and `productGetters`.

### Understand composables

Before implementing any composable, you should get familiar with its TypeScript interfaces.

Let's start with the [UseProduct interface](../reference/api/core.useproduct.html) (note the capital `U`). It uses [Typescript generics](https://www.typescriptlang.org/docs/handbook/2/generics.html). The reason is that we want to provide an excellent development experience by providing types for the data stored in and returned from composables. However, each platform has a unique data structure, and we don't want to make any assumptions. That's why it's up to integrators to provide the types.

`UseProduct` accepts two generics:
- `PRODUCTS` represents the structure of the products returned by the API,
- `PRODUCT_SEARCH_PARAMS` represents parameters accepted by the `search` method.

It also has three properties and a method called `search`. Fortunately, we don't have to create them ourselves for every composable. All composables are created using [factories](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)), which accept an object that holds the logic for composable methods. **Factory will take care of creating all properties, methods and even handling errors and loading state, so you can focus on integrating it with the API.**

### Implement `useProduct` composable

Now, when we understand how composables are created, let's see what parameters the `useProduct` factory expects. Because this composable is relatively small and has only one method, the [UseProductFactoryParams interface](../reference/api/core.useproductfactoryparams.html) also expects one handler - `productsSearch`.

Open `packages/composables/src/useProduct/index.ts`. This file already calls `useProductFactory` and passes `params` matching the above interface. With this done, the only thing left is to implement `productsSearch` method.

Every method in `factoryParams` has at least one argument called [context](../reference/api/core.integrationcontext.html). Second, optional argument is an object holding parameters passed to composable method and [customQuery](../reference/api/core.customquery.html).

Remove placeholder code from `productsSearch` method and add the following:

```typescript
// Replace `sloth` with the name of your package defined in `packages/composables/nuxt/plugin.js`
const data = await context.$sloth.api.getProduct(params);

return data;
```

This method calls an API endpoint called `getProduct`. It doesn't exist yet, so let's create it.

:::tip Passing parameters to the API
An HTTP request is sent to the Server Middleware whenever you call any method in the `context.$sloth.api` object. Additionally, all parameters passed to them will be included in the payload. Sending too much data may result in poor performance, so try to pass as few parameters as possible.
:::

:::tip Composable dependencies
Sometimes you need to use composable as a dependency inside another one. You can access these composables in the `provide` function in the factory params. This function is called when composable is created and returned data is available in the `context` object.

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

:::

### Understand `api-client`

In the previous section, we added a call to the `getProduct` endpoint. Before we implement this endpoint, you should understand why we need `api-client` in the first place.

As mentioned in [Project structure](#project-structure) section, `api-client` is a server that acts as a proxy. All requests to and from various APIs pass through it. You might be wondering why we choose this architecture. Theoretically, calling APIs directly from the browser would result in a better performance.

While this might be true for simple scenarios, it doesn't scale well. Some of the benefits of using such proxy are:

- **Caching** - selected responses can be cached to improve the performance significantly. While it's possible to do caching in the browser, each customer would have to make at least one request to a given endpoint.
- **Lower cost** - when responses are cached, fewer requests are sent to the e-commerce platform. Depending on the provider, it might reduce the cost.
- **Smaller bundle** - with all the clients installed and configured on the server, the final bundle sent to the browsers can be much smaller. This is especially true for APIs based on GraphQL.
- **Security** - API configuration, secrets, and keys are stored on the server and are not sent to the browser.

### Implement `getProduct` endpoint

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

In the example below we use `axios` instance created before to call `products` API. This is just an example and you should modify it to fit your integration:

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

Every new API handler must be added to the `apiClientFactory` in `packages/api-client/src/index.server.ts` to be available.

```typescript
// packages/api-client/src/index.server.ts
import { getProduct } from './api/getProduct';

// Unrelated code omitted

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct
  }
});
```

### Understand getters

Now that we can request and save API data, we need to display it to the user. Every integration can use and extend our base theme for that. However, accessing the data straight from integrations isn't possible because each uses unique data structures. To do that, we need getters.

Getters allow us to take raw responses from the API and map or extract data to a standard format, which we use in the template.

### Implement `productGetters`

Open `packages/composables/src/getters/productGetters.ts`. There is a bunch of functions returned in a single object. Each of them has at least one argument: either a raw response from the API (`products`) or a single item extracted from it (`product`).

Although types of arguments are unknown and specific to your integration, return types are already defined and must match those defined in [ProductGetters interface](../reference/api/core.productgetters.html).

You need to implement all of these functions and, if necessary, add your own.

:::tip What if data is not available?
We recommend that you always add fallback value in getters. This will prevent errors during Server-Side Rendering and avoid some edge cases if data or nested properties are not available, e.g., still being retrieved from the backend.

```typescript
export const getProductName = (product: ProductVariant): string => {
  // Return empty string if "product" object or "name" property are not available
  return product?.name || '';
};
```

:::

## Create a theme

:::warning Ignore the `_theme` folder
You can ignore the `_theme` folder. It's created only during the development and will not show up in the end projects.

You should not modify it because any changes will be lost.
:::

Some forms or checkout components are blank in the default theme because they display or modify integration-specific data. For this reason, you need to create few Vue components and JavaScript files:

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
| middleware/checkout.js                       |                                     |             |
| middleware/is-authenticated.js               |                                     |             |

### Create Vue components

Form components emit events in the following format:

```js
emit('submit', {
  form: Object,
  onComplete: (data: any) => {},
  onError: (error: Error) => {}
})
```

When such an event is sent, the application will handle communication with the API. If the request is successful, the `onComplete` callback will be called with the response from the API. Otherwise, `onError` will be called with the error caught.

### Create a middleware

`checkout` and `is-authenticated` middlewares are used to prevent access to selected pages.

Please refer to [Nuxt.js middleware documentation](https://nuxtjs.org/docs/2.x/directory-structure/middleware/) for more information.
