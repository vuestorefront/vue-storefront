# Working with themes

For core development purposes, we aim to have only one default theme. With this approach, we have less code to maintain and are able to apply changes faster to maintain the same quality across every platform theme.

The core development theme is a base for a project theme generated through CLI. The CLI merges the default theme from the Nuxt.js module with integration-specific files and outputs a regular Nuxt project containing all of that files. For client projects, there is no inheritance mechanism.

For this reason, it's important to keep the APIs in the default theme agnostic. Clients can do whatever they need in their projects, but we should keep agnosticism for maintenance purposes.

Default theme is located in `packages/core/nuxt-theme-module` folder and recognized as `@vue-storefront/nuxt-theme`

## Configuration

To inherit the default theme from your integration theme, you need to install a `@vue-storefront/nuxt-theme` [package](https://www.npmjs.com/package/@vue-storefront/nuxt-theme).

In `nuxt.config.js` within your integration theme, add `@vue-storefront/nuxt-theme` into `buildModules` key, and as a second value, you can pass options, e.g.:


```json
// nuxt.config.js
{
  buildModules: [
    ['@vue-storefront/nuxt-theme', {
        generate: {
          replace: {
            apiClient: '@vue-storefront/commercetools-api',
            composables: '@vue-storefront/commercetools'
          }
        }
      }
    ]
  ]
}
```

From now on, you can overwrite the default theme with your own files.

Default theme is available in `/packages/core/nuxt-theme-module/theme/` folder. In it, you will find imports using `ejs` syntax. This is the reason you should provide a config for `@vue-storefront/nuxt-theme` module. In your theme you should use them when importing integration-specific packages:


```ts
// nuxt-theme-module/theme/pages/Product.vue
import { useProduct, useCart, productGetters, useReview, reviewGetters } from '<%= options.generate.replace.composables %>';
```

```ts
// your-theme/theme/pages/Product.vue
import { useProduct, useCart, productGetters, useReview, reviewGetters } from '@vue-storefront/commercetools';
```

## How it works

Under the hood, what this module does is:

1. Compiling lodash templates from `@vue-storefront/nuxt-theme` to `_theme` folder of your integration.
2. Aliasing components, layouts, and pages to `_theme` folder
3. Watching changes in ``@vue-storefront/nuxt-theme` package and rebuilding `theme` folder on each change.

## Magic comments

Sometimes you might need to have some code only for core development purposes (mostly in `nuxt.config.js`).In that case, you should wrap this code with these comments:
```js
// @core-development-only-start 
core development only stuff
// @core-development-only-end
```
::: warning
Be cautious with this feature! The more differences will be between the theme you develop, and the theme customer sees, the more unreliable it could get.
:::
