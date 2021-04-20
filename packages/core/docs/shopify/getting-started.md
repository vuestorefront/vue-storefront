# Getting started

To get started  initialize the project from [Vue Storefront CLI](https://docs.vuestorefront.io/v2/general/installation.html).

Then set up your credentials in `middleware.config.js`

```js
// middleware.config.js
module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: {
          domain: 'YOUR SHOPIFY STORE DOMAIN',
          storefrontAccessToken: 'SHOPIFY STORE API KEY'
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};

```