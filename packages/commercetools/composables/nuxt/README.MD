# Vue Storefront Next x Commerctools Module
## How to install
1. Open `nuxt.config.js`
2. At the bottom of `buildModules` add:
```js
['@vue-storefront/commercetools/nuxt', {
  disableGenerateTokenMiddleware: false,
  api: {
    uri: 'https://yourshop.com/vsf-ct-dev/graphql',
    authHost: 'https://auth.sphere.io',
    projectKey: 'vsf-ct-dev',
    clientId: '<your_client_id>',respon
    clientSecret: '<your_client_secret>',
    scopes: [
      'create_anonymous_token:vsf-ct-dev',
      'manage_my_orders:vsf-ct-dev',
      'manage_my_profile:vsf-ct-dev',
      'manage_my_shopping_lists:vsf-ct-dev',
      'manage_my_payments:vsf-ct-dev',
      'view_products:vsf-ct-dev',
      'view_published_products:vsf-ct-dev'
    ]
  }
}]
```

## Generate token middleware 
Commercetools nuxt module injects middleware that is responsible for createing/refreshing token if needed - when user refreshes page. In some rare case, you might want to disable this middleware. If so, add `disableGenerateTokenMiddleware` to the `@vue-storefront/commercetools/nuxt`'s options module in `buildModules`:
```js
['@vue-storefront/commercetools/nuxt', {
  // ...
  disableGenerateTokenMiddleware: true
  // ...
}]
```

## Example config
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