/**
   * Return unique entity.id
   * @param {Object} entity
   */
export function uniqueEntityId (entity) {
  return new Date().getTime()
}

/**
   * Return unique entity key name for specified key value
   * @param {String} key
   * @param {String} value
   */
export function entityKeyName (key, value) {
  return key + '$$' + value
}
