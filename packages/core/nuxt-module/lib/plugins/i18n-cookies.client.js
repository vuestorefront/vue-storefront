const { VSF_CURRENCY_COOKIE, VSF_COUNTRY_COOKIE, VSF_LOCALE_COOKIE, i18nRedirectsUtil } = require('@vue-storefront/core');

const i18nCookiesPlugin = ({ $cookies, i18n, app }) => {
  const i18nOptions = <%= serialize(options) %>;
  const cookieNames = {
    currency: i18nOptions.cookies?.currencyCookieName || VSF_CURRENCY_COOKIE,
    country: i18nOptions.cookies?.countryCookieName || VSF_COUNTRY_COOKIE,
    locale: i18nOptions.cookies?.localeCookieName || VSF_LOCALE_COOKIE
  }
  const cookieOptions = {
    path: '/',
    sameSite: 'lax',
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // Year from now
  };
  const isRouteValid = !!app.context?.route?.name;
  const cookieLocale = $cookies.get(cookieNames.locale);
  const cookieCurrency = $cookies.get(cookieNames.currency);

  const getCurrencyByLocale = (locale) =>
    i18n.numberFormats?.[locale]?.currency?.currency
    || i18nOptions.currency
    || (i18nOptions.currencies.length && i18nOptions.currencies[0].name);

  const utils = i18nRedirectsUtil({
    path: app.context?.route?.path,
    defaultLocale: i18nOptions.defaultLocale,
    availableLocales: i18nOptions.locales.map((item) => item.code),
    acceptedLanguages: navigator.languages,
    cookieLocale
  });

  const targetLocale = utils.getTargetLocale();

  if (!isRouteValid) {
    i18n.setLocale(targetLocale);
  }

  const settings = {
    locale: targetLocale,
    currency: getCurrencyByLocale(targetLocale),
    country: i18nOptions.country || (i18nOptions.countries.length && i18nOptions.countries[0].name)
  };

  const missingFields = Object
    .entries(settings)
    .reduce((carry, [name, value]) => {
      !value && carry.push(name);

      return carry;
    }, []);

  if (missingFields.length) {
    throw new Error(`Following fields are missing in the i18n configuration: ${ missingFields.join(', ') }`);
  }

  if (cookieLocale !== settings.locale) {
    $cookies.set(cookieNames.locale, settings.locale, cookieOptions);
  }

  if (cookieCurrency !== settings.currency) {
    $cookies.set(cookieNames.currency, settings.currency, cookieOptions);
  }

  !$cookies.get(cookieNames.country) && $cookies.set(cookieNames.country, settings.country, cookieOptions);

  i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, context) => {
    $cookies.set(cookieNames.locale, newLocale, cookieOptions);
    $cookies.set(cookieNames.currency, getCurrencyByLocale(newLocale), cookieOptions);
    window.location.href = context.route.fullPath;
  }
};

export default i18nCookiesPlugin;
