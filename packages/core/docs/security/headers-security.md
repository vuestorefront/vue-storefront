# HTTP Headers security

To improve the security of Vue Storefront applications, we preinstall the [Helmet](https://helmetjs.github.io/) security extension by default for Nuxt application and the [Server Middleware](/architecture/server-middleware.html).

In this document we show how to change the default configuration in both applications. For a list of all available options, see the [Helmet documentation](https://helmetjs.github.io/docs/).

## Configuring Helmet in Nuxt

`Helmet` is disabled by default. You can enable it using the `helmet` property in the `@vue-storefront/middleware/nuxt` module configuration. You can pass `true` to enable it with the default configuration or an object to use your custom configuration.

```javascript
// nuxt.config.js
export default {
  modules: [
    ['@vue-storefront/middleware/nuxt', {
      helmet: true
      // or
      helmet: {
        // ...configuration
      }
    }]
  ]
}
```

```javascript
// nuxt.config.js
export default {
  modules: [
    ['@vue-storefront/middleware/nuxt', {
      helmet: {
        // default configuration
        crossOriginOpenerPolicy: false,
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        permittedCrossDomainPolicies: {
          permittedPolicies: 'none'
        }
      }
    }]
  ]
}
```

## Configuring Helmet in VSF Server Middleware

`Helmet` is disabled by default. You can enable it using the `helmet` property in the `middleware.config.js` file. You can either pass `true` to enable it with the default configuration or pass an object to use your custom configuration.

```javascript
// middleware.config.js
module.exports = {
  helmet: {
    // default configuration
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none'
    }
  }
};
```
