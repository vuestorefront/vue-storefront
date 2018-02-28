import he from 'he'

/**
 * Decodes any named and numerical character references in text
 * @param {String} value
 */
export function htmlDecode (value) {
  return value ? he.decode(value) : ''
}
