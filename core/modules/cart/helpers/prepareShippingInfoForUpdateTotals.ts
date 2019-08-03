import isString from 'lodash-es/isString'

const applyOptions = (item) => {
  if (item.options && isString(item.options)) {
    return { ...item, options: JSON.parse(item.options) }
  }

  return item
}

const reduceToObject = (previousValue, currentValue) => ({
  ...previousValue,
  [currentValue.item_id]: currentValue
})

const prepareShippingInfoForUpdateTotals = (shippingInfoItems) =>
  shippingInfoItems
    .map(applyOptions)
    .reduce(reduceToObject, {})

export default prepareShippingInfoForUpdateTotals
