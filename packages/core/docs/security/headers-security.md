# HTTP Headers security

To improve the security of your application, we ship by default in the `middleware` modules, the [Helmet.js](https://helmetjs.github.io/) security extension.

Our architecture provides a layer of API in order to the application communicate with the `api-client`. You can find more information about the architecture in the [Networking](/architecture/networking.html) page.

# Configuring Helmet.js

This configuration is exclusive to the `@vue-storefront/middleware` package, and the communication between the front and the backend (`api-client` communication).

To configure the module, you need to add in the `@vue-storefront/middleware` module, a set of options.

Find all available [Helmet.js](https://helmetjs.github.io/) options in the following link [https://helmetjs.github.io/docs/](https://helmetjs.github.io/docs/)

## Configuring the @vue-storefront/middleware Helmet.js

This configuration is exclusive to the Nuxt.js communication. Any new options added here will be used in the Nuxt.js rendering and SSR process.

```javascript
// nuxt.config.js
export default {
    modules: [
    ['@vue-storefront/middleware/nuxt', {
      enableHelmet: true,
      helmet: {
        // helmet options
        // @see https://helmetjs.github.io/docs/
        crossOriginOpenerPolicy: false,
        permittedCrossDomainPolicies: {
          permittedPolicies: 'none'
        },
        contentSecurityPolicy: false,
      }
    }]
  ],
}
```

## Configuring the Integration Helmet.js

This configuration is exclusive to the middleware communication with the `api-client` of the integration. Any new options added here will be used in the communication process between the application and `api-client` integration.

```javascript
// middleware.config.js
module.exports = {
  integrations: {...},
   helmet: {
    // helmet options
    // @see https://helmetjs.github.io/docs/
    crossOriginOpenerPolicy: false,
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none'
    },
    contentSecurityPolicy: false,
  }
};
```
