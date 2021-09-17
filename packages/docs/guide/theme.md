# Theme
## Directory structure

If you followed our [Installation guide](/general/installation.html), you should have a fully functional e-commerce application. As mentioned in previous documents, Vue Storefront extends Nuxt.js, so the structure of both applications is similar. Most directories come from Nuxt.js, and you can read more about them on their [Directory Structure](https://nuxtjs.org/docs/2.x/get-started/directory-structure) page.

* [.nuxt](https://nuxtjs.org/docs/2.x/directory-structure/nuxt);
* [components](https://nuxtjs.org/docs/2.x/directory-structure/components);
* `composables` - contains custom composables that override your integration or are not part of the Vue Storefront core. It may include composables specific to your theme;
* `helpers` - contains helper functions. It is a good place to store methods used in the multiples places of the application;
* `lang` - contains translations for your application. Available locales are configured in the `nuxt.config.js` file;
* [layouts](https://nuxtjs.org/docs/2.x/directory-structure/layouts);
* [middleware](https://nuxtjs.org/docs/2.x/directory-structure/middleware);
* [pages](https://nuxtjs.org/docs/2.x/directory-structure/pages);
* [static](https://nuxtjs.org/docs/2.x/directory-structure/static);
* `middleware.config.js` - configuration file for the [Server Middleware](/advanced/server-middleware.html);
* [nuxt.config.js](https://nuxtjs.org/docs/2.x/directory-structure/nuxt-config);

## Storefront UI

<center>
<img src="../images/theme/storefront-ui.jpg" />
</center>

Almost every component in our default theme uses components whose names start with `Sf`. These come from [Storefront UI](http://storefrontui.io/) - a design system and library of Vue.js components dedicated to e-commerce, maintained by the Vue Storefront core team. It comes with [Storybook](https://storybook.storefrontui.io/) to help you customize and test the components.

The library is fully customizable. It can be used in different contexts and with different designs.
It's excellent for the multi-tenancy model as a shared UI library that can be customized differently for each tenant.

To learn more about Storefront UI, please check its [Documentation](https://docs.storefrontui.io/).

::: tip Want to use another UI library? No problem!
If you don't want to use Storefront UI, feel free to remove it from your project. It's just a UI layer, and the project can work with any other UI library or a custom code.
:::

## Customizing the theme

### Changing existing pages, components, and layouts

To update the existing components, you need to identify them first. Vue.js Devtools helps us in that. Open the tool and click on the `Select` button above the component tree, then click on the DOM element you want to update. One of the components in the tree should get highlighted. You can look for the component with the same name in the `layout`, `pages`, or `components` directories and update it to your needs. However, there are few exceptions to this rule.

#### `Sf` components

If the name of the component starts with `Sf` (indicating that it comes from Storefront UI), you should refer to the direct **parent** component. The behavior and look of such components can be changed by passing different properties and using slots. Refer to the StorefrontUI documentation linked above for more information.

#### `LazyHydrate` and `Anonymous Component` components

These two components come from the `vue-lazy-hydration` library and are wrappers around other components. In Vue Storefront, they are used to improve the performance by deferring the hydration process (when components become interactive) and don't affect the look of other components.

If you encounter one of these components, you should refer to the direct **child** component. 

### Adding new page

To add a new page, create a new component in the `pages` folder and name it the same as your route using `PascalCase`.

As an example, let's create the `AboutUs.vue` component. This by itself creates a new route named `/aboutus` (thanks to [File System Routing](https://nuxtjs.org/docs/2.x/features/file-system-routing/) in Nuxt.js) and in some cases might be enough. However, to follow the convention of using `kebab-case` in URLs, let's use [extendRoutes](https://nuxtjs.org/guides/configuration-glossary/configuration-router#extendroutes) in `nuxt.config.js` to have more control over the route.

Add following configuration to `nuxt.config.js` to create new route `/about-us`:

```javascript
// nuxt.config.js

export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'AboutUs',
        path: '/about-us',
        component: resolve(__dirname, 'pages/AboutUs.vue')
      });
    }
  }
};
```

## Routing

Out of the box, some routes are injected via `@vue-storefront/nuxt-theme` module:

- Home Page (`/`);
- Category Page (`/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?`);
- Product Page (`/p/:id/:slug/`);
- User Profile Page (`/my-account/:pageName?`);
- Checkout (`/checkout`):
  - Shipping (`/checkout/shipping`);
  - Billing (`/checkout/billing`);
  - Payment (`/checkout/payment`);
  - Thank You page (`/checkout/thank-you`);
- Custom 404 page;

To override existing routes or adding your own, use [extendRoutes](https://nuxtjs.org/guides/configuration-glossary/configuration-router#extendroutes) in `nuxt.config.js`. Additionally, Nuxt.js automatically registers components created in the `pages` folder as new routes. You can read more about this on the [File System Routing](https://nuxtjs.org/docs/2.x/features/file-system-routing/) page.

## Updating styles

There are few ways of updating the default styles. Below we describe the most optimal ways for the most common cases.

### Adding global styleheet

To add global styles applied to all pages, use the [css property](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-css/) in `nuxt.config.js`.

### Adding stylesheet to specific layout, page, or component

To add a stylesheet to a specific component, use `@import` regardless if you are using CSS, SCSS, or LESS.

```vue
<style>
@import "@/assets/stylesheet.css";
</style>
```

### Using variables, mixins, and function in components

Usually, to access style variables, mixins, and functions, we have to import them in every component separately. Thanks to [@nuxtjs/style-resources](https://github.com/nuxt-community/style-resources-module#readme) module, we can register them in `nuxt.config.js` and access them without extra `@import` statements.

:::danger Be careful
Stylesheets in `styleResources` should **only** contain variables, mixins, and functions. During the build process, the components import these stylesheets. Any styles declared in them are added to every component, which can significantly hurt the performance and application size.
:::

We use this approach to have access to StorefrontUI helpers in all components:

```js
// nuxt.config.js
export default {
  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })]
  },
};
```

## Preinstalled modules and libraries

Below you can find a list of the most important Nuxt Modules and libraries that come preinstalled with the default theme:

### Nuxt.js modules

- `@nuxtjs/pwa`;
- `nuxt-i18n`;
- `@vue-storefront/nuxt`;
  - `@nuxtjs/composition-api`;
  - `@nuxt/typescript-build`;
  - `@nuxtjs/style-resources`;
  - `nuxt-purgecss`;
- `@vue-storefront/nuxt-theme`;
  - `vue-lazy-hydration`;

### Libraries

- [`@storefront-ui/vue`](https://storefrontui.io);
- [`vee-validate`](https://vee-validate.logaretm.com/v3);
- [`lodash`](https://lodash.com/);
