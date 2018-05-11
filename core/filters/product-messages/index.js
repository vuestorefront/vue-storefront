import _ from 'lodash'
/**
 * Format message string for product validation messages object
 */
export function formatProductMessages (messages) {
  return _.compact(Object.values(messages)).join(', ')
}
