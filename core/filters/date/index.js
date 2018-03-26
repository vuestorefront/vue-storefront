import moment from 'moment'
import config from 'config'

/**
 * Converts date to format defined in config file
 * @param {String} date
 */
export function date (date) {
  return moment(date).format(config.i18n.dateFormat)
}
