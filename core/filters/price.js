import { currentStoreView } from '@vue-storefront/core/lib/multistore'

/**
 * Converts number to price string
 * @param {Number} value
 */
export function price (value, storeView) {
  if (isNaN(value)) {
    return value
  }
  let formattedVal = Math.abs(parseFloat(value)).toFixed(2)
  const _storeView = storeView || currentStoreView();
  if (!_storeView.i18n) {
    return value;
  }
  const prependCurrency = (price) => {
    return _storeView.i18n.currencySign + price
  }

  const appendCurrency = (price) => {
    return price + _storeView.i18n.currencySign
  }

  if (_storeView.i18n.currencySignPlacement === 'append') {
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
