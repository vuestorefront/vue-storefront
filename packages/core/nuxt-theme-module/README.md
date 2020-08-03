# Nuxt Theme Module

This module is basically our default theme on steroids. It contains additional utilities that make it easier to work with the theme (in projects and as core developers) and allows to disable parts of its features:
- By default, it adds eCommerce [routes](https://github.com/DivanteLtd/vue-storefront/blob/next/packages/core/nuxt-theme-module/routes.js) to your app.
- If you set `generate` in the config, it will copy, merge & watch for changes in agnostic and integration theme. 

## How to install
Add dependency:
```sh
yarn add @vue-storefront/nuxt-theme
```
Add it to `buildModules` in your `nuxt.config.js`:
```js
['@vue-storefront/nuxt-theme'],
```

## Configuration details
### `routes`
If you want to disable autoadding routes you can do it:
```js
['@vue-storefront/nuxt-theme', {
    routes: false
}],
```
### `generate`
To properly configure `generate` property you have to provide data that will be replaced in EJS templates. This property applies only to the core development:
```js
['@vue-storefront/nuxt-theme', {
    generate: {
        replace: {
            apiClient: '@vue-storefront/commercetools-api',
            composables: '@vue-storefront/commercetools'
        }
    }
}],
```
Example EJS template where it will be pasted:
```js
import { useCategory } from '<%= options.generate.replace.composables %>';
```

If you want to change the target directory where agnostic and integration themes will be merged and copied during core development change the `generate.path` property (default: `.theme`):
```js
['@vue-storefront/nuxt-theme', {
    generate: {
        path: '.custom-dir'
    }
}],
```
