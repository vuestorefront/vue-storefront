import { decode } from 'he'

/**
 * Decodes any named and numerical character references in text
 * @param {String} value
 */
export function htmlDecode (value: any) {
  return value ? decode(value) : ''
}
