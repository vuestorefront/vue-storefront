import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import CurrencyFormatter from 'currencyformatter.js'

/**
 * Converts number to price string
 * @param {Number} value
 */
export function price (value, storeView) {
  if (isNaN(value)) {
    return value
  }
  const _storeView = storeView || currentStoreView();
  if (!_storeView.i18n) {
    return value;
  }

  const { defaultLocale, currencyCode, currencySign, currencyPattern, currencyDecimal, currencyGroup } = _storeView.i18n;

  const separatorIndex = defaultLocale.indexOf('-');
  const languageCode = (separatorIndex > -1) ? defaultLocale.substr(0, separatorIndex) : defaultLocale;

  return CurrencyFormatter.format(value, {
    currencyCode: currencyCode,
    symbol: currencySign,
    locale: languageCode,
    decimal: currencyDecimal,
    group: currencyGroup,
    pattern: currencyPattern
  });
}
