import { currentStoreView } from '@vue-storefront/core/lib/multistore';

const formatValue = (value, locale) => {
  const price = Math.abs(parseFloat(value));
  return price.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const applyCurrencySign = (formattedPrice, { currencySign, priceFormat }) => {
  return priceFormat.replace('{sign}', currencySign).replace('{amount}', formattedPrice)
}

/**
 * Converts number to price string
 * @param {Number} value
 */
export function price (value, storeView) {
  if (isNaN(value)) {
    return value;
  }
  const _storeView = storeView || currentStoreView();
  if (!_storeView.i18n) {
    return value;
  }
  const { defaultLocale, currencySign, priceFormat } = _storeView.i18n

  const formattedValue = formatValue(value, defaultLocale);
  const valueWithSign = applyCurrencySign(formattedValue, { currencySign, priceFormat })

  if (value >= 0) {
    return valueWithSign;
  } else {
    return '-' + valueWithSign;
  }
}
