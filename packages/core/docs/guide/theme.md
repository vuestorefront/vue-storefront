# Theme

## Directory structure

If you followed our [Installation guide](/general/installation), you should have a fully functional e-commerce application. As mentioned in previous documents, Vue Storefront is based on Nuxt.js, so the structure of both applications is similar. Most directories come from Nuxt.js and you can read more about them on their [Directory Structure](https://nuxtjs.org/docs/2.x/get-started/directory-structure) page.

* [.nuxt](https://nuxtjs.org/docs/2.x/directory-structure/nuxt);
* [components](https://nuxtjs.org/docs/2.x/directory-structure/components);
* `composables` - contains custom composables that override your integration or are not part of the Vue Storefront core. It may include composables specific to your theme;
* `helpers` - contains helper functions. This is a good place to store methods used in the multiples places of the application;
* `lang` - contains translations for your application. Available locales are configured in the `nuxt.config.js` file;
* [layouts](https://nuxtjs.org/docs/2.x/directory-structure/layouts);
* [middleware](https://nuxtjs.org/docs/2.x/directory-structure/middleware);
* [pages](https://nuxtjs.org/docs/2.x/directory-structure/pages);
* [static](https://nuxtjs.org/docs/2.x/directory-structure/static);
* `middleware.config.js` - configuration file for the [Server Middleware](/advanced/server-middleware);
* [nuxt.config.js](https://nuxtjs.org/docs/2.x/directory-structure/nuxt-config);

## Storefront UI

<img src="https://camo.githubusercontent.com/5e44d945fe332e31a78af2f8345cdb3aae2de666aa3619ca81f67da7ff2187f8/68747470733a2f2f692e6962622e636f2f37534b627a354b2f3132333435372e706e67" />

Almost every component in our default theme contains other components whose names start with `Sf`. These come from [Storefront UI](http://storefrontui.io/) - a design system and library of Vue.js components dedicated to e-commerce, maintained by the Vue Storefront core team. The library is fully customizable, so it can be used in different contexts and with different designs.

With Storefront UI you're getting [Vue.js components](<(https://storybook.storefrontui.io/)>), [Figma designs](figma.com/file/N0Ct95cSAoODNv7zYS01ng/Storefront-UI-%7C-Design-System?node-id=0%3A1) and [Storybook](https://storybook.storefrontui.io/) to test them. The library works great for the multi-tenancy model as a shared UI library that can be customized differently for each tenant.

To learn more about Storefront UI please check its [Documentation](https://docs.storefrontui.io/).

::: tip Want to use another UI library? No problem!
If you don't want to use Storefront UI feel free to remove it from your project. It's just a UI layer and the project can work with any other UI library or a custom code.
:::

## Preinstalled modules and libraries

Below you can find a list of the most important Nuxt Modules and libraries that are preinstalled with the default theme:

<!-- todo make proper docs for vsf modules and move their submodules to these docs-->

### Nuxt Modules

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
- [`wee-validate`](https://vee-validate.logaretm.com/v3);
- [`lodash`](https://lodash.com/);
