# Layouts and Routing

Layouts and Routing in Vue Storefront is entirely powered by the Nuxt.js. On this page we will only give a brief overview of these features, but you can learn more on the [Views](https://nuxtjs.org/docs/concepts/views/) page in the Nuxt.js documentation.

## View hierarchy

Every page consists of layers — some layers are shared between many views, others are specific to a give route. Each layer is described in detail in the sections below.

### HTML document

At the root of hierarchy is the HTML document. By default it's provided by the framework, but you can customize it by creating a `app.html` file in the root directory of your project. It has a special tags that are used to insert parts of the documents, and by default looks like this:

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

### Layouts

All `.vue` files inside of the `layouts` directory are automatically registered as layouts. Unless configured otherwise, pages use the `default.vue` component as their layout. Open the `layouts/default.vue` component to get the general idea on how the page looks like, what component are used and what data is loaded within the `setup` function.

Layout components include a special `<Nuxt />` component that displays the content of the page, based on the current URL. Those pages are Vue.js components too, registered in the `pages` directory.

There is also `error.vue` layout — used when an error occurred. It doesn't use the `<Nuxt />` component, but receives the `error` prop, which you can use to get an error code or message.

The convention is to use `lowercase` when naming components inside of the `layouts` directory, eg. `blog.vue`.

### Pages

All `.vue` files inside of the `pages` directory will be automatically registered as application routes. For example creating an `AboutUs.vue` component will create an `/aboutus` route. The same way, creating the same component inside a nested directory called `company` will create `/company/aboutus` route. This is thanks to the thanks to [File System Routing](https://nuxtjs.org/docs/2.x/features/file-system-routing/) feature available in Nuxt.js. In the sections below we describe how to manually modify routes.

Pages can define a custom [layout](https://nuxtjs.org/docs/directory-structure/pages#layout) property to change the default used for this view.

The convention is to use `PascalCase` when naming components inside of the `layouts` directory, eg. `MyAccount.vue`.

## Predefined routes

Every Vue Storefront project comes with a predefined list of routes injected by the `@vue-storefront/nuxt-theme` module. However, if you navigate around the page, you might notice that the page routes don't match the name of the components inside the `pages` directory.

This is because we use the [extendRoutes](https://nuxtjs.org/guides/configuration-glossary/configuration-router#extendroutes) function to create a custom routes for some of the components that come out of the box.

Here's the map of routes and their corresponding components:

| Route path                                          | Component (in the `pages` directory) | Route name       |
|---------------------------------------------------- | -------------------------------------|------------------|
| `/`                                                 | `Home.vue`                           | `home`           |
| `/p/:id/:slug/`                                     | `Product.vue`                        | `product`        |
| `/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?`    | `Category.vue`                       | `category`       |
| `/my-account/:pageName?`                            | `MyAccount.vue`                      | `my-account`     |
| `/checkout`                                         | `Checkout.vue`                       | `checkout`       |
| `/checkout/shipping`                                | `Checkout/Shipping.vue`              | `shipping`       |
| `/checkout/billing`                                 | `Checkout/Billing.vue`               | `billing`        |
| `/checkout/payment`                                 | `Checkout/Payment.vue`               | `payment`        |
| `/checkout/thank-you`                               | `Checkout/ThankYou.vue`              | `thank-you`      |
| `/reset-password`                                   | `ResetPassword.vue`                  | `reset-password` |

## Manually adding and modyfing routes

If you want to manually add your own custom routes or modify some that we provided, use the `extendRoutes` function in the `nuxt.config.js`. This function has two properties:

* `routes` — array of already registered routes. You can `push` or delete entries from it.
* `resolve` — helper function for resolving Vue.js components based on their paths in the project.

For the sake of example, let's assume that we created a `pages/AboutUs.vue` component, but we want to use the `/company/about-us` route instead of auto-registered `/aboutus`. There are two approaches we could take.

The first apparoch is to **delete existing route** and **register new route** with a different path.

```javascript
// nuxt.config.js

export default {
  router: {
    extendRoutes(routes, resolve) {
      // Delete automatically registered route
      routes.splice(
        routes.findIndex(route => route.path === '/AboutUs'),
        1
      );

      // Re-register the same component but with different path
      routes.push({
        name: 'AboutUs',
        path: '/company/about-us',
        component: resolve(__dirname, 'pages/AboutUs.vue')
      });
    }
  }
};
```

Alternatively we can **modify `path` property of the existing entry** like so:

```javascript
// nuxt.config.js

export default {
  router: {
    extendRoutes(routes, resolve) {
      // Find route index
      const index = routes.findIndex(route => route.path === '/AboutUs');
      
      // Modify route path
      routes[index].path = '/company/about-us';
    }
  }
};
```

## What's next

Layouts and pages are one thing, but in the end, they must display components and styles. Otherwise, the pages would be empty.

New projects come with a default [Theme](./theme.html), so the next step is to understand what makes it look like this.
