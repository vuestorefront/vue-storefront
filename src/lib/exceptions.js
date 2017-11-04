export class ValidationError {
    /**
     * ValidationError to be used with multiple validation errors return from Ajv or other validators
     * @param {Object} _validationMessages dictionary of validation errors
     */
  constructor (_validationMessages) {
    this._messages = _validationMessages
    this.name = 'ValidationError'
  }

  /**
   * @return {Array} array of errors
   */
  get messages () {
    return this._messages
  }

  toString () {
    return this._messages.join(', ')
  }
}

