import decode from 'lean-he/decode'

/**
 * Decodes any named and numerical character references in text
 * @param {String} value
 */
export function htmlDecode (value) {
  return value ? decode(value) : ''
}
