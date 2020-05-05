const locales = [
  {
    code: 'en',
    file: 'en.js',
    label: 'English',
    shopId: 1,
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
    label: 'German',
    shopId: 2,
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
