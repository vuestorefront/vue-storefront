import { i18nRedirectsUtil, VSF_COUNTRY_COOKIE, VSF_CURRENCY_COOKIE, VSF_LOCALE_COOKIE } from '@vue-storefront/core';

const i18nCookiesPlugin = ({ $cookies, i18n, app, redirect }) => {
  const i18nOptions = <%= serialize(options) %>;
  const isServer = typeof window === 'undefined';
  const navigator = isServer ? undefined : window.navigator;
  const acceptedLanguage = app.context.req?.headers?.['accept-language'] || navigator?.languages || '';
  const isRouteValid = !!app.context.route.name;
  const autoRedirectByLocale = i18nOptions.autoRedirectByLocale ?? true;
  const cookieNames = {
    currency: i18nOptions.cookies?.currencyCookieName || VSF_CURRENCY_COOKIE,
    country: i18nOptions.cookies?.countryCookieName || VSF_COUNTRY_COOKIE,
    locale: i18nOptions.cookies?.localeCookieName || VSF_LOCALE_COOKIE
  }
  const cookieLocale = $cookies.get(cookieNames.locale);
  const cookieCurrency = $cookies.get(cookieNames.currency);
  const cookieCountry = $cookies.get(cookieNames.country);
  const autoChangeCookie = {
    locale: true,
    currency: true,
    country: true,
    ...i18nOptions.autoChangeCookie,
  };

  const getCurrencyByLocale = (locale) =>
    i18n.numberFormats?.[locale]?.currency?.currency
    || i18nOptions.currency
    || (i18nOptions.currencies.length && i18nOptions.currencies[0].name);

  const utils = i18nRedirectsUtil({
    path: app.context.route.path,
    defaultLocale: i18nOptions.defaultLocale,
    availableLocales: i18nOptions.locales.map((item) => item.code),
    acceptedLanguages: isServer ? acceptedLanguage.split(',').map((item) => item.split(';')[0]) : acceptedLanguage,
    cookieLocale,
    autoRedirectByLocale
  });

  const targetLocale = utils.getTargetLocale();
  const redirectPath = utils.getRedirectPath();

  if (!isRouteValid) {
    app.i18n.setLocale(targetLocale);
  }

  if (isServer) {
    app.i18n.cookieValues = {
      ...(autoChangeCookie.locale && { [cookieNames.locale]: targetLocale }),
      ...(autoChangeCookie.currency && { [cookieNames.currency]: getCurrencyByLocale(targetLocale) })
    };

    if (autoRedirectByLocale && redirectPath) {
      redirect(redirectPath);
    }

    return;
  }
  const cookieOptions = {
    path: '/',
    sameSite: 'lax',
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Year from now
    ...i18nOptions.cookieOptions
  };
  const settings = {
    locale: targetLocale,
    currency: getCurrencyByLocale(targetLocale),
    country: i18nOptions.country || (i18nOptions.countries.length && i18nOptions.countries[0].name)
  };

  const missingFields = Object
    .entries(settings)
    .reduce((carry, [name, value]) => {
      return [
        ...carry,
        ...(!value ? [name] : [])
      ]
    }, []);

  if (missingFields.length) {
    throw new Error(`Following fields are missing in the i18n configuration: ${missingFields.join(', ')}`);
  }

  if ((cookieLocale !== settings.locale && autoChangeCookie.locale) || !cookieLocale) {
    $cookies.set(cookieNames.locale, settings.locale, cookieOptions);
  }

  if ((cookieCurrency !== settings.currency && autoChangeCookie.currency) || !cookieCurrency) {
    $cookies.set(cookieNames.currency, settings.currency, cookieOptions);
  }

  if ((cookieCountry !== settings.country && autoChangeCookie.country) || !cookieCountry) {
    $cookies.set(cookieNames.country, settings.country, cookieOptions);
  }

  i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, context) => {
    if (autoChangeCookie.locale) {
      $cookies.set(cookieNames.locale, newLocale, cookieOptions);
    }

    if (autoChangeCookie.currency) {
      $cookies.set(cookieNames.currency, getCurrencyByLocale(newLocale), cookieOptions);
    }

    window.location.href = context.route.fullPath;
  }
}

export default i18nCookiesPlugin;
