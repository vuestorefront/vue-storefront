# HTTP Headers security

To improve the security of Vue Storefront applications, we preinstall the [Helmet](https://helmetjs.github.io/) security extension by default for Nuxt application and the [Server Middleware](/architecture/server-middleware.html).

In this document we show how to change the default configuration in both applications. For a list of all available options, see the [Helmet documentation](https://helmetjs.github.io/docs/).

## Configuring Helmet in Nuxt

To change the default configuration of Helmet in Nuxt application, use the `helmet` object in the configuration of the `@vue-storefront/middleware/nuxt` module. If you want to disable it, use the `enableHelmet` property instead.

```javascript
// nuxt.config.js

export default {
  modules: [
    ['@vue-storefront/middleware/nuxt', {
      enableHelmet: true,
      helmet: {
        crossOriginOpenerPolicy: false,
        contentSecurityPolicy: false,
        permittedCrossDomainPolicies: {
          permittedPolicies: 'none'
        }
      }
    }]
  ]
}
```

## Configuring Helmet in Server Middleware

To change the default configuration of Helmet in Server Middleware, use the `helmet` object in the `middleware.config.js` file.

```javascript
// middleware.config.js

module.exports = {
  helmet: {
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: false,
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none'
    }
  }
};
```
