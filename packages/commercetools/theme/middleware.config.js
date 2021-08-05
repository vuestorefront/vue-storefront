module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: {
          uri: 'https://api.commercetools.com/vsf-qa/graphql',
          authHost: 'https://auth.sphere.io',
          projectKey: 'vsf-qa',
          clientId: 'LoKnq1faNAdasGqk5R-zDIUd',
          clientSecret: '6upp22N3H6uR5GdFHVEeaJXJJxAPZXr4',
          scopes: [
            'create_anonymous_token:vsf-qa',
            'manage_my_profile:vsf-qa',
            'view_categories:vsf-qa',
            'introspect_oauth_tokens:vsf-qa',
            'manage_my_payments:vsf-qa',
            'manage_my_orders:vsf-qa',
            'manage_my_shopping_lists:vsf-qa',
            'view_published_products:vsf-qa',
            'view_stores:vsf-qa'
          ]
        },
        currency: 'USD',
        country: 'US'
      }
    }
  }
};

// module.exports = {
//   integrations: {
//     ct: {
//       location: '@vue-storefront/commercetools-api/server',
//       configuration: {
//         api: {
//           uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
//           authHost: 'https://auth.sphere.io',
//           projectKey: 'vsf-ct-dev',
//           clientId: 'kuFT95wdTP4uH_hVOKjqfGEo',
//           clientSecret: 'tklIDic86mgWrFy0oBHRQQmwX7ZC5wIP',
//           scopes: [
//             'manage_project:vsf-ct-dev',
//           ]
//         },
//         currency: 'USD',
//         country: 'US'
//       }
//     }
//   }
// };
