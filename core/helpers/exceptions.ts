export class HttpError {
  public message
  public code
  public name

  constructor (message: string, code: string) {
    this.message = message
    this.code = code
    this.name = 'HttpError'
  }
  toString () {
    return 'HttpError' + this.code + ': ' + this.message
  }
}
