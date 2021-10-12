const { VSF_LOCALE_COOKIE, VSF_CURRENCY_COOKIE, i18nRedirectsUtil } = require('@vue-storefront/core');

const i18nRedirectsPlugin = ({ app, redirect }) => {
  const i18nOptions = <%= serialize(options) %>;
  const acceptedLanguage = app.context?.req?.headers?.['accept-language'] || '';
  const isRouteValid = !!app.context?.route?.name;
  const cookieNames = {
    currency: i18nOptions.cookies?.currencyCookieName || VSF_CURRENCY_COOKIE,
    locale: i18nOptions.cookies?.localeCookieName || VSF_LOCALE_COOKIE
  }
  const getCurrencyByLocale = (locale) =>
    app.i18n.numberFormats?.[locale]?.currency?.currency
    || i18nOptions.currency
    || (i18nOptions.currencies.length && i18nOptions.currencies[0].name);

  const acceptedCodes = acceptedLanguage.split(',').map((item) => item.split(';')[0]);
  const utils = i18nRedirectsUtil({
    path: app.context?.route?.path,
    defaultLocale: i18nOptions.defaultLocale,
    availableLocales: i18nOptions.locales.map((item) => item.code),
    acceptedLanguages: acceptedCodes,
    cookieLocale: app.$cookies.get(cookieNames.locale)
  });
  const targetLocale = utils.getTargetLocale();
  const redirectPath = utils.getRedirectPath();

  app.i18n.cookieValues = {
    [cookieNames.locale]: targetLocale,
    [cookieNames.currency]: getCurrencyByLocale(targetLocale)
  };

  if (!isRouteValid) {
    app.i18n.setLocale(targetLocale);
    return;
  }

  if (redirectPath) {
    redirect(redirectPath);
  }
}

export default i18nRedirectsPlugin;
