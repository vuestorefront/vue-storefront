# Working with themes

For core development purposes we aim to have only one default theme. Thanks to that we have much less code to maintain, can apply changes faster and maintain same quality across every platform themes.

Core Development Theme and Project Themes are different things. Core development Theme is a base for a project (client) theme that is generated through CLI. CLI concatenates default theme from nuxt module with integration-specific files and outputs a regular Nuxt project containing all of that files. For client projects there is no inheritance mechanism.

Because of that, it's very important to keep the agnostic APIs in default theme. Clients can do whatever they want in their projects but we should keep agnosticism for maintenance purposes.

Default theme is located in `packages/core/theme-module` folder and recognized as `@vue-storefront/nuxt-theme`

## Configuration

Run VSF CLI create project command with 2 arguments. The first is name of the integration, e.g. `commercetools`, `about-you` or just `boilerplate`. Latter is the target path where your project will be created.

## How CLI create project works

Under the hood what this command does is:

1. Copying integration theme to the target path
2. Copying & compiling files from abstract theme to the target path without overriding files
3. Removing parts marked by magic comments from nuxt.config.js

## How module works

Under the hood what this module does is:

1. Compiling lodash templates from `@vue-storefront/nuxt-theme` to `.theme` folder of your integration.
2. Aliasing components, layouts and pages to `.theme` folder
3. Watching changes in ``@vue-storefront/nuxt-theme` package and rebuilding `theme` folder on each change.

## Compiling process

By compiling process we mean replacing template placeholders with value based on your integration. In the abstract theme we have parts like `import { useProduct, useCart } from '<%= options.composables %>` - options.composables is a placeholder for value passed to composables option in nuxt.config.js). This value will be autoconfigured by our CLI.

## Magic comments

To find code lines to remove easily - we use magic comments. We cut everything from `// @core-development-only-start` to `// @core-development-only-end`.