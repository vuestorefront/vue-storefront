import isString from 'lodash-es/isString'
import Totals from '@vue-storefront/core/modules/cart/types/Totals'

const applyOptions = (item: Totals) => {
  if (item.options && isString(item.options)) {
    return { ...item, options: JSON.parse(item.options) }
  }

  return item
}

const reduceToObject = (previousValue: any, currentValue: Totals) => ({
  ...previousValue,
  [currentValue.item_id]: currentValue
})

const prepareShippingInfoForUpdateTotals = (totals: Totals[]) =>
  totals
    .map(applyOptions)
    .reduce(reduceToObject, {})

export default prepareShippingInfoForUpdateTotals
