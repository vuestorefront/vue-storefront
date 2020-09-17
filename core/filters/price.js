import { currentStoreView } from '@vue-storefront/core/lib/multistore'

/**
 * Converts number to price string
 * @param {Number} value
 */
export function price (value, storeView) {
  if (isNaN(value)) {
    return value
  }

  const _storeView = storeView || currentStoreView()
  if (!_storeView.i18n) {
    return Number(value).toFixed(2)
  }

  const { defaultLocale, currencyCode, fractionDigits } = _storeView.i18n

  const options = { style: 'currency', currency: currencyCode, minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }

  const localePrice = value.toLocaleString(defaultLocale, options)

  return localePrice
}
