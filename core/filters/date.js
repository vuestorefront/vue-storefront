import { currentStoreView } from '@vue-storefront/store/lib/multistore'

/**
 * Converts date to format provided as an argument or defined in config file (if argument not provided)
 * @param {String} date
 * @param {String} format
 */
export function date (date, format) {
  const { defaultLocale } = currentStoreView().i18n
  return new Date(date.replace(/-/g, '/')).toLocaleString(defaultLocale)
}
