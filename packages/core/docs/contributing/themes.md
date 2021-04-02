# Working with themes

For core development purposes we aim to have only one default theme. Thanks to that we have much less code to maintain, can apply changes faster and maintain same quality across every platform themes.

Core Development Theme and Project Themes are different things. Core development Theme is a base for a project (client) theme that is generated through CLI. CLI concatenates default theme from nuxt module with integration-specific files and outputs a regular Nuxt project containing all of that files. For client projects there is no inheritance mechanism.

Because of that, it's very important to keep the agnostic APIs in default theme. Clients can do whatever they want in their projects but we should keep agnosticism for maintenance purposes.

Default theme is located in `packages/core/nuxt-theme-module` folder and recognized as `@vue-storefront/nuxt-theme`

## Configuration

To inherit from the default theme in your integration theme you need to install `@vue-storefront/nuxt-theme` [package](https://www.npmjs.com/package/@vue-storefront/nuxt-theme)

In `nuxt.config.js` of your integration theme add `@vue-storefront/nuxt-theme` into `buildModules` key, as a second value you can pass options e.g:

```json
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

Now you will have ability to overwrite default theme with your files, based on our default files.

Default Nuxt theme module is available in `/packages/core/nuxt-theme-module/theme/` folder.

## How it works

Under the hood what this module does is:

1. Compiling lodash templates from `@vue-storefront/nuxt-theme` to `_theme` folder of your integration.
2. Aliasing components, layouts and pages to `_theme` folder
3. Watching changes in ``@vue-storefront/nuxt-theme` package and rebuilding `theme` folder on each change.

## Magic comments

Sometimes you might need to have some code only for core development purposes (mostly in `nuxt.config.js`).In that case youu should wrap this code with these comments:
```js
// @core-development-only-start 
core development only stuff
// @core-development-only-end
```
::: warning
Be cautious with this feature! The more differences will be between the theme you develop and the theme customer sees the more unreliable it could get.
:::