# Nuxt Cache Control Module

This module handles adding cache-control header to document after render for caching capabilities

## How to install
Add dependendy: 
```sh 
yarn add @vue-storefront/cache-control
```
Add it to `modules` in your `nuxt.config.js`:

```js
['@vue-storefront/cache-control']
```

## Configuration details

### `default` 
This property allows you do override default value of `cache-control` header which is initially set to `max-age=60`
```js
['@vue-storefront/cache-control', {
  default: 'max-age=120'
}]
```

### `matchRoute`
Customize `cache-control` values for selected routes. you can use `*` for a wildcard. To remove `cache-control` header use `none` value.
```js
['@vue-storefront/cache-control', {
  matchRoute: {
    '/': 'max-age=240',
    '/p/*': 'max-age=360',
    '/c/*': 'none'
  }
}]
```