# Theme

A project without any theme would just show a blank page, but if you have seen any of Vue Storefront demos or created a project using our CLI, you know that's not the case. So what makes it look like it does?

This page will describe what makes the default theme, how to customize it, and what tricks we use to improve the performance.

## What's makes a default theme

Although, at first glance, it might look like all of our e-commerce integrations use the same exact theme, it's not the case. All of them are built upon the same base theme and modify it to work well and cover features of a given platform. This means that some integrations might have more pages, different UI elements, or additional Nuxt.js modules or plugins.

For this reason, in this section, we will focus only on the common parts of all themes.

### Preinstalled modules and libraries

Every new Vue Storefront project comes with a set of preinstalled Nuxt.js modules and plugins, as well as Vue.js libraries. These packages offer a variety of features from cookie handling to form validation and are used by the base theme. You can remove some of them, but only if you decide to create a custom theme from scratch.

#### Nuxt.js modules and plugins

- [`@nuxt/typescript-build`](https://typescript.nuxtjs.org/) - for TypeScript support,

- [`@nuxtjs/pwa`](https://pwa.nuxtjs.org/) - for PWA functionalities,

- [`@nuxtjs/composition-api`](https://composition-api.nuxtjs.org/) - for Composition API support,

- [`@nuxtjs/style-resources`](https://www.npmjs.com/package/@nuxtjs/style-resources) - for importing SASS variables globally,

- [`nuxt-i18n`](https://i18n-legacy.nuxtjs.org/) - for internationalization (translations and price formatting),

- [`nuxt-purgecss`](https://purgecss.com/guides/nuxt.html) - for removing unused CSS from the final build,

- [`cookie-universal-nuxt`](https://www.npmjs.com/package/cookie-universal-nuxt) - for handling cookies on the server (SSR) and client (browser).

#### Vue.js libraries

- [`vee-validate`](https://vee-validate.logaretm.com/v3) - for frontend form validation,

- [`vue-scrollto/nuxt`](https://www.npmjs.com/package/vue-scrollto) - for smooth scrolling to HTML elements,

- [`vue-lazy-hydration`](https://www.npmjs.com/package/vue-lazy-hydration) - for delaying hydration and improving performance.

### Storefront UI

<figure style="text-align: center">
  <img
    src="../images/storefront-ui.webp"
    alt="StorefrontUI logo and default theme"
  />
  <figcaption style="font-size: 0.9rem">(Click to zoom)</figcaption>
</figure>

Almost every page in our default theme uses components whose names start with `Sf`. These come from the [Storefront UI](http://storefrontui.io/) — a design system and library of Vue.js components dedicated to e-commerce, maintained by the Vue Storefront team. Every component can be heavily customized using [props](https://v2.vuejs.org/v2/guide/components-props.html) and [slots](https://v2.vuejs.org/v2/guide/components-slots.html).

Please check [Storefront UI documentation](https://docs.storefrontui.io/) to learn more and interactively customize and test the components.

::: tip Want to use another UI library? No problem!
If you don't want to use Storefront UI, feel free to remove it from your project. It's just a UI layer, and the project can work with any other UI library or a custom code.
:::

## How to customize the theme

Every default theme will need customization at some point. Regardless of how complex the changes are, we recommend reusing as much from the default theme as possible. This will not only save you time but will likely reduce the number of bugs, thanks to the time we spend on stabilization and testing.

### Updating layouts, pages, and components

To update the existing component, you need to identify it first, and Vue.js Devtools is invaluable in this. Open the Vue.js Devtools, right-click the DOM element you want to update, and select `Inspect Vue component`. One of the components in the tree in Vue.js Devtools should get highlighted. You can look for the component with the same name in the `layout`, `pages`, or `components` directories and update it to your needs. However, there are a few exceptions to this rule described below.

#### `Sf` components

If the component's name starts with `Sf`, it means that it comes from [StorefrontUI](https://storefrontui.io/) library. The look and behavior of such components are controlled using props and slots passed from the direct **parent** component.

#### `LazyHydrate` and `Anonymous Component` components

These two components come from the [vue-lazy-hydration](https://github.com/maoberlehner/vue-lazy-hydration) library and are wrappers around other components. They are used to improve the performance by deferring the hydration process (making components interactive) and don't affect the look of other components. The behavior of such components is controlled using props passed from the direct **parent** component.

### Updating styles

There are a few ways of updating the default styles. Below we describe the most optimal methods for the most common cases.

#### Adding global styleheet

To add global styles applied to all pages, use the [css property](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-css/) in `nuxt.config.js`.

#### Adding stylesheet to specific layout, page, or component

To add a stylesheet to a specific component, use `@import` regardless of whether you are using CSS, SCSS, or LESS.

```vue
<style>
@import "@/assets/stylesheet.css";
</style>
```

#### Using variables, mixins, and function in components

Usually, to access style variables, mixins, and functions, we import them in every component separately. Thanks to the [@nuxtjs/style-resources](https://github.com/nuxt-community/style-resources-module#readme) module, we can register them in `nuxt.config.js` and access them without extra `@import` statements.

:::danger Be careful
Stylesheets in `styleResources` should **only** contain variables, mixins, and functions. During the build process, the components import these stylesheets. Any **styles** declared in them are added to every component, significantly impacting the performance and application size.
:::

We use this approach to have access to StorefrontUI helpers in all components:

```javascript
// nuxt.config.js

export default {
  styleResources: {
    scss: [
      require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })
    ]
  },
};
```
