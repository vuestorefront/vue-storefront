import { currentStoreView } from '@vue-storefront/core/lib/multistore'

/**
 * Converts date to format provided as an argument or defined in config file (if argument not provided)
 * @param {String} date
 * @param {String} format
 */
export function date (date, format) {
  const storeView = currentStoreView()
  return new Date(date).toLocaleString(storeView.i18n.defaultLocale)
}
