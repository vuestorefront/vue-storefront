/**
 * @returns {string}
 */
export function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}
/**
   * Return unique entity.id
   * @param {Object} entity
   */
export function uniqueEntityId (entity) {
  return new Date().getTime() + '-' + guid()
}

/**
   * Return unique entity key name for specified key value
   * @param {String} key
   * @param {String} value
   */
export function entityKeyName (...values) {
  return values.join('$$')
}
