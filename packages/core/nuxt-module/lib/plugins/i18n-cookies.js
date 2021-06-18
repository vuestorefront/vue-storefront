const { VSF_CURRENCY_COOKIE, VSF_COUNTRY_COOKIE } = require('@vue-storefront/core');

const i18nCookiesPlugin = ({ $cookies }) => {
  const i18n = <%= serialize(options) %>;

  const settings = {
    defaultLocale: i18n.defaultLocale || (i18n.locales.length && i18n.locales[0].code),
    currency: i18n.currency || (i18n.currencies.length && i18n.currencies[0].name),
    country: i18n.country || (i18n.countries.length && i18n.countries[0].name)
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

  const cookieOptions = {
    path: '/',
    sameSite: 'lax',
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // Year from now
  };
  
  !$cookies.get(VSF_CURRENCY_COOKIE) && $cookies.set(VSF_CURRENCY_COOKIE, settings.currency, cookieOptions);
  !$cookies.get(VSF_COUNTRY_COOKIE) && $cookies.set(VSF_COUNTRY_COOKIE, settings.country, cookieOptions);
};

export default i18nCookiesPlugin;
