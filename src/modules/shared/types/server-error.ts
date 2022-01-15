export default class ServerError extends Error {
  public constructor (m: string) {
    super(m);

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
