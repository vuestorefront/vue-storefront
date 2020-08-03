# Nuxt Theme Module
This module:
- By default, it adds eCommerce [routes](https://github.com/DivanteLtd/vue-storefront/blob/next/packages/core/nuxt-theme-module/routes.js) to your app.
- If you set `generate` in the config, it will copy, merge & watch for changes in Agnostic and Integration theme. 

## How to install?
Install module:
```sh
yarn add @vue-storefront/nuxt-theme
```
Add it to build modules in your `nuxt.config.js`:
```js
['@vue-storefront/nuxt-theme'],
```

## Configuration details
If you want to disable autoadding routes you can do it:
```js
['@vue-storefront/nuxt-theme', {
    routes: false
}],
```
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

Changing `projectLocalThemeDir` to other than `.theme`:
```js
['@vue-storefront/nuxt-theme', {
    generate: {
        path: '.custom-dir'
    }
}],
```