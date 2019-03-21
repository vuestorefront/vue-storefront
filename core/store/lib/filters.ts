import decode from 'lean-he/decode'

/**
 * Decodes any named and numerical character references in the text
 * @param {String} value
 */
export function htmlDecode (value: any) {
  return value ? decode(value) : ''
}
