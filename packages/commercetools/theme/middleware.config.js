module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
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
        country: 'US'
      },
      customQueries: {
        'root-categories-query': ({ variables }) => {

          const rootCategoriesQuery = `
            fragment DefaultRootCategory on Category {
              id
              slug(acceptLanguage: $acceptLanguage)
              name(acceptLanguage: $acceptLanguage)
              childCount
            }
            query categories($where: String, $sort: [String!], $limit: Int, $offset: Int, $acceptLanguage: [Locale!]) {
              categories(where: $where, sort: $sort, limit: $limit, offset: $offset) {
                offset
                count
                total
                results {
                  ...DefaultRootCategory
                }
              }
            }
          `;

          variables.where = 'parent is not defined';

          return {
            query: rootCategoriesQuery,
            variables
          };
        }
      }
    }
  }
};
