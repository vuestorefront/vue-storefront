import { setup } from '@vue-storefront/commercetools-api'

setup({
  api: {
    uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
    authHost: 'https://auth.sphere.io',
    projectKey: 'vsf-ct-dev',
    clientId: 'E4kSLZbP-XGL6KDEJU1Pd5Sl',
    clientSecret: 'U_5IRgdcKHkRlSMeCMabo57gYybDBIUU',
    scopes: [
      'view_types:vsf-ct-dev',
      'create_anonymous_token:vsf-ct-dev',
      'manage_my_orders:vsf-ct-dev',
      'view_customers:vsf-ct-dev',
      'view_shopping_lists:vsf-ct-dev',
      'manage_my_profile:vsf-ct-dev',
      'manage_my_shopping_lists:vsf-ct-dev',
      'manage_my_payments:vsf-ct-dev',
      'view_products:vsf-ct-dev',
      'view_published_products:vsf-ct-dev'
    ],
  },
  locale: 'en',
  currency: 'USD',
})
