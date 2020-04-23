import { price as orgPriceFilter } from '@vue-storefront/core/filters/price'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { default as _round } from 'lodash-es/round'

export const formatValue = (value, locale?) => {
  if (!locale) {
    const _storeView = currentStoreView();
    locale = !_storeView.i18n ? 'en-US' : _storeView.i18n.defaultLocale;
  }

  const price = Math.abs(parseFloat(value))
  const formatter = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return formatter.format(price)
}

export const round = (value, decimal: number = 2) => {
  return _round(value, decimal)
}

export const price = orgPriceFilter
