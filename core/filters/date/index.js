import moment from 'moment'
import config from 'config'

/**
 * Converts date to format provided as an argument or defined in config file (if argument not provided)
 * @param {String} date
 * @param {String} format
 */
export function date (date, format = config.i18n.dateFormat) {
  return moment(date).format(format)
}
