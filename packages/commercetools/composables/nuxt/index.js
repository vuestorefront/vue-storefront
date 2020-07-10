import path from 'path';

export default function (moduleOptions) {
  this.options.router.middleware.push('commercetools');
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });

  const localeNames = moduleOptions.locales.map(l => ({ code: l.name, file: `${l.name}.js`, iso: l.name }));
  this.options.i18n = {
    locales: localeNames,
    defaultLocale: localeNames[0].code,
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: localeNames[0].code
    },
    detectBrowserLanguage: {
      cookieKey: moduleOptions.cookies.localeCookieName,
      alwaysRedirect: true
    }
  };
}
