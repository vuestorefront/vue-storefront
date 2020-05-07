export const config = {
  api: {
    // https://api.us-central1.gcp.commercetools.com
    uri: 'https://api.us-central1.gcp.commercetools.com/circlek/graphql',
    authHost: 'https://auth.us-central1.gcp.commercetools.com',
    projectKey: 'circlek',
    clientId: 'Xyf1Njzq_GqTzrSK8ElEz5Ag',
    clientSecret: 'VpRBg-meCN6yMMMyIFKNZP5FN2iX3ve_',
    scopes: [
      'create_anonymous_token:circlek',
      'manage_my_orders:circlek',
      'manage_my_profile:circlek',
      'manage_my_shopping_lists:circlek',
      'manage_my_payments:circlek',
      'view_categories:circlek',
      'view_published_products:circlek',
      'view_products:circlek'
    ]
  },
  locale: 'en',
  currency: 'USD',
  country: 'US',
  countries: [
    { name: 'US',
      label: 'United States' },
    { name: 'AT',
      label: 'Austria' },
    { name: 'DE',
      label: 'Germany' },
    { name: 'NL',
      label: 'Netherlands' }
  ],
  currencies: [
    { name: 'EUR',
      label: 'Euro' },
    { name: 'USD',
      label: 'Dollar' }
  ],
  locales: [
    { name: 'en',
      label: 'English' },
    { name: 'de',
      label: 'German' }
  ],
  cookies: {
    currencyCookieName: 'vsf-currency',
    countryCookieName: 'vsf-country',
    localeCookieName: 'vsf-locale'
  }};
