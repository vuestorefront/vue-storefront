# Working with themes

For core development purposes we aim to have only one default theme. Thanks to that we have much less code to maintain, can apply changes faster and maintain same quality across every platform themes.

Core Development Theme and Project Themes are different things. Core development Theme is a base for a project (client) theme that is generated through CLI. CLI concatenates default theme from nuxt module with integration-specific files and outputs a regular Nuxt project containing all of that files. For client projects there is no inheritance mechanism.

Because of that, it's very important to keep the agnostic APIs in default theme. Clients can do whatever they want in their projects but we should keep agnosticism for maintenance purposes.

Default theme is located in `packages/core/theme-module` folder and recognized as `@vue-storefront/nuxt-theme`

## Configuration

To inherit from the default theme in your integration theme you need to install private `@vue-storefront/nuxt-theme` package. from this repo.

In `nuxt.config.js` of your integration theme set `apiClient/composables/helpers `options to be named as your integration packages. For example under composables you can put `@vue-storefront/comemrcetools-composables`. It will be used in lodash templates inside `@vue-storefront/nuxt-theme` as a replacement for variables (like here `import { useProduct, useCart } from '<%= options.composables %>` - `options.composables` is a palceholder for value passed to composables option in `nuxt.config.js`)

## How it works

Under the hood what this module does is:

1. Compiling lodash templates from `@vue-storefront/nuxt-theme` to `_theme` folder of your integration.
2. Aliasing components, layouts and pages to `_theme` folder
3. Watching changes in ``@vue-storefront/nuxt-theme` package and rebuilding `theme` folder on each change.

## Magic comments

To find code lines to remove easily - we use magic comments. We cut everything from `// @core-development-only-start` to `// @core-development-only-end`.