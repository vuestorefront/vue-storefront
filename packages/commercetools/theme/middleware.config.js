
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: {
          uri: 'https://api.commercetools.com/vsf-generic-ent-demo/graphql',
          authHost: 'https://auth.europe-west1.gcp.commercetools.com',
          projectKey: 'vsf-generic-ent-demo',
          clientId: 'w3HqE0p55rhxCWinIjFiq26L',
          clientSecret: '8ThyrROTeD73Uc9rzfiwSgNpVIku8bOE',
          scopes: [
            'create_anonymous_token:vsf-generic-ent-demo',
            'view_categories:vsf-generic-ent-demo',
            'view_published_products:vsf-generic-ent-demo',
            'view_stores:vsf-generic-ent-demo',
            'manage_my_profile:vsf-generic-ent-demo',
            'manage_my_orders:vsf-generic-ent-demo',
            'manage_my_payments:vsf-generic-ent-demo',
            'manage_my_shopping_lists:vsf-generic-ent-demo'
          ]
        },
        serverApi: {
          clientId: 'y-ia9E9gne-uybwVa9Lqzqfn',
          clientSecret: 'sX5T3-5zF3ieIoVyvtDDnl3cjxTXNTDs',
          scopes: [
            'manage_customers:vsf-generic-ent-demo',
            'manage_products:vsf-generic-ent-demo'
          ]
        },
        currency: 'USD',
        country: 'US',
        languageMap: {
          en: ['en', 'de'],
          de: ['de', 'en']
        }
      }
    }
  }
};
