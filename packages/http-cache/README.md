# Nuxt Cache Control Module

This module handles adding http-cache header to document after render for caching capabilities

## How to install
Add dependendy: 
```sh 
yarn add @vue-storefront/http-cache
```
Add it to `modules` in your `nuxt.config.js`:

```js
['@vue-storefront/http-cache/nuxt']
```

## Configuration details

### `default` 
This property allows you do override default value of `http-cache` header which is initially set to `max-age=60`
```js
['@vue-storefront/http-cache/nuxt', {
  default: 'max-age=120'
}]
```

### `matchRoute`
Customize `http-cache` values for selected routes. you can use `*` for a wildcard. To remove `http-cache` header use `none` value.
```js
['@vue-storefront/http-cache/nuxt', {
  matchRoute: {
    '/': 'max-age=240',
    '/p/*': 'max-age=360',
    '/c/*': 'none'
  }
}]
```