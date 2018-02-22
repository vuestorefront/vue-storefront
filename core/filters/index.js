import he from 'he'
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

/**
 * Decodes any named and numerical character references in text
 * @param {String} value
 */
export function htmlDecode (value) {
  return value ? he.decode(value) : ''
}
