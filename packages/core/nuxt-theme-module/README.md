# Nuxt Theme Module
This module:
- Changes `.nuxt` buildDir to name you set in the config or `.theme` 
- Adds `reset.scss` transpiled to CSS to the head (it removes default stylings applied by browser, e.g. blue links)
- By default, it adds eCommerce routes to your app.
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
To properly configure `generate` property you have to provide data that will be replaced in EJS templates:
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
Changing `buildDir` to other than `.theme`:
```js
['@vue-storefront/nuxt-theme', {
    generate: {
        path: '.custom-dir'
    }
}],
```