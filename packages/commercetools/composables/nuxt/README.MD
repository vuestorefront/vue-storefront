# Example config
```js
export const config = {
  api: {
    uri: 'https://mysite.com/vsf-ct-dev/graphql',
    authHost: 'https://auth.com',
    projectKey: 'vsf-ct-dev',
    clientId: 'yourClientId',
    clientSecret: 'yourClientSecret',
    scopes: [
      'create_anonymous_token:vsf-ct-dev',
      'manage_my_orders:vsf-ct-dev',
      'manage_my_profile:vsf-ct-dev',
      'manage_my_shopping_lists:vsf-ct-dev',
      'manage_my_payments:vsf-ct-dev',
      'view_products:vsf-ct-dev',
      'view_published_products:vsf-ct-dev'
    ]
  },
  locale: 'en',
  acceptLanguage: ['en', 'de'],
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
  }
};
```