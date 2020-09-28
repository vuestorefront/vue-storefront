import { currentStoreView } from '@vue-storefront/core/lib/multistore'

const applyCurrencySign = (formattedPrice, { currencySign, priceFormat }) => {
  return priceFormat.replace('{sign}', currencySign).replace('{amount}', formattedPrice)
};

const getLocaleSeparators = (defaultLocale) => {
  return {
    decimal: (0.01).toLocaleString(defaultLocale).replace(/[0-9]/g, ''),
    group: (1000).toLocaleString(defaultLocale).replace(/[0-9]/g, '')
  }
};

const replaceSeparators = (formattedPrice, currencySeparators, separators) => {
  if (currencySeparators.decimal) formattedPrice = formattedPrice.replace(separators.decimal, currencySeparators.decimal);
  if (currencySeparators.group) formattedPrice = formattedPrice.replace(separators.group, currencySeparators.group);
  return formattedPrice;
};

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
    return Number(value).toFixed(2)
  }

  const { defaultLocale, currencySign, currencyDecimal, currencyGroup, fractionDigits, priceFormat } = _storeView.i18n;

  const options = { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits };

  let localePrice = Math.abs(value).toLocaleString(defaultLocale, options);

  if (currencyDecimal !== '' || currencyGroup !== '') {
    localePrice = replaceSeparators(localePrice, { decimal: currencyDecimal, group: currencyGroup }, getLocaleSeparators(defaultLocale));
  }

  const valueWithSign = applyCurrencySign(localePrice, { currencySign, priceFormat });

  return value >= 0 ? valueWithSign : '-' + valueWithSign;
}
