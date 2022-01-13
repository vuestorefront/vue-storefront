# Layouts and Routing

Layouts and Routing in Vue Storefront are entirely powered by Nuxt.js. We will only give a brief overview of these features on this page, but you can learn more on the [Views](https://nuxtjs.org/docs/concepts/views/) page in the Nuxt.js documentation.

## View hierarchy

Every page consists of layers — some layers are shared between many routes, others are used in one specific route. We described each layer in detail in the sections below.

### HTML document

At the root of the hierarchy is the HTML document. By default, the framework provides one, but you can customize it by creating an `app.html` file in the root directory of your project. It has special tags used to insert parts of the documents, and by default, looks like this:

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

Nuxt.js automatically registers all `.vue` files inside of the `layouts` directory as layouts. Unless configured otherwise, pages use the `default.vue` component as their layout. Open the `layouts/default.vue` component to get the general idea of how the page looks like, what components it imports and what data it loads within the `setup` function.

Layout components include a special `<Nuxt />` component that displays the page's content based on the current URL. Those pages are Vue.js components, too, explained in the next section.

There is also an `error.vue` layout — used when an error occurs. It doesn't use the `<Nuxt />` component but receives the `error` prop, which you can use to get an error code or message.

The convention is to use `lowercase` when naming components inside of the `layouts` directory, e.g., `blog.vue`.

### Pages

Nuxt.js automatically registers all `.vue` files inside the `pages` directory as application routes. For example, creating an `AboutUs.vue` component will create an `/aboutus` route. In the same way, creating this component inside a nested directory called `company` will create the `/company/aboutus` route. It's all thanks to the [File System Routing](https://nuxtjs.org/docs/2.x/features/file-system-routing/) feature available in Nuxt.js. In the sections below, we describe how to modify routes manually.

Pages can define a custom [layout](https://nuxtjs.org/docs/directory-structure/pages#layout) property to change the default used for this view.

The convention is to use `PascalCase` when naming components inside of the `pages` directory, e.g., `MyAccount.vue`.

## Predefined routes

Every Vue Storefront project has a predefined list of routes injected by the `@vue-storefront/nuxt-theme` module. However, if you navigate the page, you might notice that the page routes don't match the name of the components inside the `pages` directory.

This is because internally, we use the [extendRoutes](https://nuxtjs.org/guides/configuration-glossary/configuration-router#extendroutes) function to create custom routes for some of the components that come out of the box.

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

## Manually adding and modifying routes

If you want to manually add your custom routes or modify some already provided, use the `extendRoutes` function in the `nuxt.config.js`. This function has two properties:

* `routes` — an array of already registered routes. You can `push` or delete entries from it.
* `resolve` — helper function for resolving Vue.js components based on their paths in the project.

For the sake of example, let's assume that we created a `pages/AboutUs.vue` component, but we want to use the `/company/about-us` route instead of auto-registered `/aboutus`. There are two approaches we could take.

The first approach is to **delete existing route** and **register new route** with a different path.

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

Alternatively, we can **modify the `path` property of the existing entry** like so:

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

## Changing base path

There are cases when your store is served under a specific path, eg. `example.com/shop/`. To make Vue.js router aware of this, you need to update the configuration in the `nuxt.config.js`:

```javascript
// nuxt.config.js

export default {
  router: {
    base: "/shop/"
  }
};
```

Unfortunately not all links in your application will detect this. You can fix it, by wrap all relative links and paths to assets in `addBasePath` helper.

```vue
<template>
  <SfImage :src="addBasePath('/imageA.webp')" />
  <SfBanner :image="addBasePath('/bannerB.png')" />
</template>

<script>
import { addBasePath } from '@vue-storefront/core';

export default {
  setup() {
    return {
      addBasePath
    };
  }
};
</script>
```

## Navigating between pages

To navigate between pages within your application, use the [NuxtLink](https://nuxtjs.org/docs/features/nuxt-components/#the-nuxtlink-component) component, instead of the traditional `<a>` tag. While you can use the `<a>` tag for external links, using the `<NuxtLink />` for internal links will ensure that you make use of the Single-Page Navigation capabilities that Nuxt.js provides.

Single-Page Navigation (SPA) provides many benefits, such as:

* much faster and more responsive navigation compared to the traditional server navigation,
* framework is initialized only once,
* components shared between the pages are rendered only once (if they use the same layout),
* fewer requests and data sent over the network.

## What's next

Layouts and pages are one thing, but in the end, they must display components and styles. Otherwise, we would only serve blank pages.

New projects come with a default [Theme](./theme.html), so the next step is to understand what makes it look like this.
