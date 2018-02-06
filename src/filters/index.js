import he from 'he'

/**
 * Converts number to price string
 * @param {Number} value
 */
export function price (value) {
  return '$' + parseFloat(value).toFixed(2)
}

/**
 * Decodes any named and numerical character references in text
 * @param {String} value
 */
export function htmlDecode (value) {
  return value ? he.decode(value) : ''
}
