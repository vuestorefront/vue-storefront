import { price as orgPriceFilter } from '@vue-storefront/core/filters/price'

export const formatValue = (value, locale) => {
  const price = Math.abs(parseFloat(value))
  const formatter = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return formatter.format(price)
}

export const price = orgPriceFilter
