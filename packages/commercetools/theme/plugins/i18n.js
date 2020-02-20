import { setup, locale } from '@vue-storefront/commercetools-api';

export default function({ app }) {
  app.i18n.beforeLanguageSwitch = (oldLocale, locale) => {
    setup({ locale });
  };

  app.router.beforeEach((to, from, next) => {
    if (app.i18n.locale !== locale) {
      setup({ locale: app.i18n.locale });
    }

    next();
  });
}
