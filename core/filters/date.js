import { currentStoreView } from '@vue-storefront/core/lib/multistore'

/**
 * Converts date to format provided as an argument or defined in config file (if argument not provided)
 * @param {String} date
 * @param {String} format
 */
export function date (date, format = '') {
  const storeView = currentStoreView()
  let options = {}
  switch (format) {
    case 'LT':
      options = {hour: 'numeric', minute: 'numeric'}
      break
    case 'LTS':
      options = {hour: 'numeric', minute: 'numeric', second: 'numeric'}
      break
    case 'L':
      options = {year: 'numeric', month: '2-digit', day: '2-digit'}
      break
    case 'l':
      options = {year: 'numeric', month: 'numeric', day: 'numeric'}
      break
    case 'LL':
      options = {year: 'numeric', month: 'long', day: 'numeric'}
      break
    case 'll':
      options = {year: 'numeric', month: 'short', day: 'numeric'}
      break
    case 'LLL':
      options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
      break
    case 'lll':
      options = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'}
      break
    case 'LLLL':
      options = {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric'}
      break
    case 'llll':
      options = {year: 'numeric', month: 'short', day: 'numeric', weekday: 'short', hour: 'numeric', minute: 'numeric'}
      break
    default:
      // use empty object
  }
  console.log(format)
  console.log(options)
  return new Date(date).toLocaleString(storeView.i18n.defaultLocale, options)
}
