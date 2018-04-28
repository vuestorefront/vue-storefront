export class HttpError {
  /**
   * ValidationError to be used with multiple validation errors return from Ajv or other validators
   * @param {Object} _validationMessages dictionary of validation errors
   */
  constructor (message, code) {
    this.message = message
    this.code = code
    this.name = 'ValidationError'
  }
  toString () {
    return 'HttpError' + this.code + ': ' + this.message
  }
}
