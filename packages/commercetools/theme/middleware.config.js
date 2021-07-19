module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: {
          uri: 'http://localhost:3030/commercetools/vsf-ct-dev/graphql',
          authHost: 'http://localhost:3030/auth-sphere',
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
