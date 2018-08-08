import { currentStoreView } from '@vue-storefront/store/lib/multistore'

/**
 * Converts number to price string
 * @param {Number} value
 */
export function price (value) {
  if (isNaN(value)) {
    return value
  }
  const formattedVal = parseFloat(value).toFixed(2)
  const storeView = currentStoreView()
  if (value >= 0) {
    return storeView.i18n.currencySign + formattedVal
  } else {
    return '-' + storeView.i18n.currencySign + Math.abs(formattedVal)
  }
}
