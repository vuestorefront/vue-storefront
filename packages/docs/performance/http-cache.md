# Nuxt Cache Control Module

::: subheader
Vue Storefront has an `http-cache` module that allows you to set the `Cache-Control` header for selected routes. This is useful when you want to allow browsers or CDNs to cache your pages.
:::

The `Cache-Control` HTTP header is used to control caching behavior in browsers and CDNs. It is a good practice to set this header on your pages to allow browsers to cache them. This can improve the performance of your site by reducing the number of requests to your server.

## Installation
```sh 
yarn add @vue-storefront/http-cache
```

Once installed, you can add  `@vue-storefront/http-cache/nuxt` to the modules in your `nuxt.config.js`:

```js
[
  modules: [
    ['@vue-storefront/http-cache/nuxt', { configuration } ]
  ]
```

## Configuration Options


### `default` 
This property allows you do override default value of `Cache-Control` header which is initially set to `max-age=60`. This header will be added on all of your routes.

```js
['@vue-storefront/http-cache/nuxt', {
  default: 'max-age=120'
}]
```

### `matchRoute`
You can also specify a `matchRoute` object if you need to customize the caching behavior on a per-route basis. Wildcard routes can be specified with a `*`. To remove the `Cache-Control` header, you can pass a value of `none`.
```js
['@vue-storefront/http-cache/nuxt', {
  matchRoute: {
    '/': 'max-age=240',
    '/p/*': 'max-age=360',
    '/c/*': 'none'
  }
}]
```