
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: {
          uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
          authHost: 'https://auth.sphere.io',
          projectKey: 'vsf-ct-dev',
          clientId: 'FGUpRp88xDpaDEDpVfbfs0Q-',
          clientSecret: 'DvQvj3ccl-qwqS6qFnO-n0PUmjb8ok3G',
          scopes: [
            'create_anonymous_token:vsf-ct-dev',
            'manage_my_profile:vsf-ct-dev',
            'view_categories:vsf-ct-dev',
            'manage_my_payments:vsf-ct-dev',
            'manage_my_orders:vsf-ct-dev',
            'manage_my_shopping_lists:vsf-ct-dev',
            'view_published_products:vsf-ct-dev',
            'view_stores:vsf-ct-dev'
          ]
        },
        serverApi: {
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
