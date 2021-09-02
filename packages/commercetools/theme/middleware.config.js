
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: {
          uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
          authHost: 'https://auth.sphere.io',
          projectKey: 'vsf-ct-dev',
          clientId: 'kuFT95wdTP4uH_hVOKjqfGEo',
          clientSecret: 'tklIDic86mgWrFy0oBHRQQmwX7ZC5wIP',
          scopes: [
            'manage_project:vsf-ct-dev'
          ]
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};
