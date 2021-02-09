module.exports = {
  integrations: {
    ct: {
      apiClientPackage: '@vue-storefront/commercetools-api/server',
      modulePackage: '@vue-storefront/commercetools/nuxt',
      extensions: [
        // '@vue-storefront/commercetools',
        {
          extendApi: {
            // eslint-disable-next-line
            testFunction: async (context) => {
              console.log('test function called');
              return { test: 1 };
            }
          },
          // eslint-disable-next-line
          lifecycle: (req, res) => ({ beforeCall: ({ callName, args }) => {

            if (callName === 'getCategory') {
              console.log(args);
            }

            return args;
          } })
        }
      ],
      configuration: {
        api: {
          uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
          authHost: 'https://auth.sphere.io',
          projectKey: 'vsf-ct-dev',
          clientId: 'RT4iJGDbDzZe4b2E6RyeNe9s',
          clientSecret: '5eBt3yfZJWw1j7V6kXjfKXpuFP-YQXpg',
          scopes: [
            'manage_products:vsf-ct-dev',
            'create_anonymous_token:vsf-ct-dev',
            'manage_my_profile:vsf-ct-dev',
            'manage_customer_groups:vsf-ct-dev',
            'view_categories:vsf-ct-dev',
            'introspect_oauth_tokens:vsf-ct-dev',
            'manage_my_payments:vsf-ct-dev',
            'manage_my_orders:vsf-ct-dev',
            'manage_my_shopping_lists:vsf-ct-dev',
            'view_published_products:vsf-ct-dev'
          ]
        },
        currency: 'USD',
        country: 'US',
        countries: [
          { name: 'US', label: 'United States' },
          { name: 'AT', label: 'Austria' },
          { name: 'DE', label: 'Germany' },
          { name: 'NL', label: 'Netherlands' }
        ],
        currencies: [
          { name: 'EUR', label: 'Euro' },
          { name: 'USD', label: 'Dollar' }
        ]
      }
    }
  }
};
