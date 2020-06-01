const locales = [
  {
    code: 'en',
    file: 'en.js',
    name: 'en',
    label: 'English',
    shopId: 121,
    country: {
      name: 'US',
      label: 'United States'
    },
    currency: {
      name: 'USD',
      label: 'Dollar'
    }
  },
  {
    code: 'de',
    file: 'de.js',
    name: 'de',
    label: 'German',
    shopId: 121,
    country: {
      name: 'DE',
      label: 'Germany'
    },
    currency: {
      name: 'EUR',
      label: 'Euro'
    }
  }
];

export default {
  locales,
  defaultLocale: locales[0].code,
  lazy: true,
  langDir: 'lang/',
  vueI18n: {
    fallbackLocale: locales[0].code
  },
  detectBrowserLanguage: {
    cookieKey: 'vsf-locale',
    alwaysRedirect: true
  }
};
