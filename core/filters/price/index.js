import config from 'config'

/**
 * Converts number to price string
 * @param {Number} value
 */
export function price (value) {
  const formattedVal = parseFloat(value).toFixed(2)
  if (value >= 0) {
    return config.i18n.currencySign + formattedVal
  } else {
    return '-' + config.i18n.currencySign + Math.abs(formattedVal)
  }
}
