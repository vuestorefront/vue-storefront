import { setup } from '@vue-storefront/shopify-api';

export default async function init() {
  // const { app } = context;
  // const { locales: availableLocales, locale: defaultLocale } = app.i18n;
  // // const selectedLocale = availableLocales.find((locale) => locale.code === defaultLocale);

  const config = {
    domain: process.env.SHOPIFY_STORE_URL || 'vsf-next-pwa.myshopify.com',
    storefrontAccessToken: process.env.SHOPIFY_STORE_TOKEN || '03f21475b97c18fa05c0ab452c368af4',
    countries: [
      {
        code: 'us',
        label: 'US'
      },
      {
        code: 'in',
        label: 'IN'
      }
    ],
    currencies: [
      {
        code: 'us',
        label: 'US',
        prefixSign: true,
        sign: '$'
      },
      {
        code: 'in',
        label: 'IN',
        prefixSign: true,
        sign: 'Rs.'
      }
    ],
    locales: [
      {
        code: 'en',
        label: 'EN'
      }
    ]
  };

  setup(config);
}
