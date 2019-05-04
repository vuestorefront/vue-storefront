import { currentStoreView } from '@vue-storefront/core/lib/multistore'

/**
 * Converts number to price string
 * @param {Number} value
 */
export function price (value) {
  if (isNaN(value)) {
    return value
  }
  let formattedVal = Math.abs(parseFloat(value)).toFixed(2)
  const storeView = currentStoreView()

  const prependCurrency = (price) => {
    return storeView.i18n.currencySign + price
  }

  const appendCurrency = (price) => {
    return price + storeView.i18n.currencySign
  }

  if (storeView.i18n.currencySignPlacement === 'append') {
    formattedVal = appendCurrency(formattedVal)
  } else {
    formattedVal = prependCurrency(formattedVal)
  }

  if (value >= 0) {
    return formattedVal
  } else {
    return '-' + formattedVal
  }
}
