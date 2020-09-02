import path from 'path';
import { CT_TOKEN_MIDDLEWARE_SLUG } from '@vue-storefront/commercetools/nuxt/helpers';

const hasDefinedMiddleware = (options) => options.router && options.router.middleware && options.router.middleware.includes(CT_TOKEN_MIDDLEWARE_SLUG);

const getI18nSettings = ({ i18n }) => {
  if (i18n) {
    return {
      locale: i18n.defaultLocale,
      currency: i18n.currency,
      country: i18n.country,
      acceptLanguage: i18n.locales.map(({ code }) => code),
      countries: i18n.countries,
      currencies: i18n.currencies,
      locales: i18n.locales.map(({ label, code }) => ({ name: code, label }))
    };
  }

  return {};
};

const getMissingFields = (options) =>
  ['locale', 'currency', 'country', 'acceptLanguage', 'countries', 'currencies', 'locales']
    .filter(o => options[o] === undefined);

export default function (moduleOptions) {

  if (!moduleOptions.disableGenerateTokenMiddleware && !hasDefinedMiddleware(this.options)) {
    this.options.router.middleware.push(CT_TOKEN_MIDDLEWARE_SLUG);
  }
  const options = {
    ...moduleOptions,
    ...getI18nSettings(this.options)
  };

  const missingFields = getMissingFields(options);

  if (missingFields.length > 0) {
    throw new Error(`Please provide missing i18n fields: (${missingFields.join(', ')})`);
  }

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options
  });

}
