import path from 'path';
import { CT_TOKEN_MIDDLEWARE_SLUG } from '@vue-storefront/commercetools/nuxt/helpers';
import { createMiddleware } from '@vue-storefront/core/server';

const hasDefinedMiddleware = (options) => options.router && options.router.middleware && options.router.middleware.includes(CT_TOKEN_MIDDLEWARE_SLUG);

const mapI18nSettings = (i18n) => ({
  locale: i18n.defaultLocale,
  currency: i18n.currency,
  country: i18n.country,
  acceptLanguage: i18n.locales.map(({ code }) => code),
  countries: i18n.countries,
  currencies: i18n.currencies,
  locales: i18n.locales.map(({ label, code }) => ({ name: code, label }))
});

const isNuxtI18nUsed = (moduleOptions) => moduleOptions.i18n && moduleOptions.i18n.useNuxtI18nConfig;

const getMissingFields = (options) =>
  ['locale', 'currency', 'country', 'acceptLanguage', 'countries', 'currencies', 'locales']
    .filter(o => options[o] === undefined);

export default function (moduleOptions) {
  const { middleware } = createMiddleware(moduleOptions);

  if (!moduleOptions.disableGenerateTokenMiddleware && !hasDefinedMiddleware(this.options)) {
    this.options.router.middleware.push(CT_TOKEN_MIDDLEWARE_SLUG);
  }

  const options = isNuxtI18nUsed(moduleOptions)
    ? { ...moduleOptions, ...mapI18nSettings(this.options.i18n) }
    : moduleOptions;

  const missingFields = getMissingFields(options);

  if (missingFields.length > 0) {
    throw new Error(`Please provide missing i18n fields: (${missingFields.join(', ')})`);
  }

  this.extendBuild(config => {
    config.resolve.alias['@vue-storefront/commercetools-api$'] = require.resolve('@vue-storefront/commercetools-api');
  });

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options
  });

  this.addServerMiddleware(middleware);
}
