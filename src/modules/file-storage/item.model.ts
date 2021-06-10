export default class Item {
  public constructor (
    public readonly id: string,
    public readonly type: string,
    public readonly url: string,
    public readonly createdAt?: Date,
    public readonly isNew = true
  ) {
    [id, type, url].forEach((arg, index) => {
      if (arg === undefined) {
        throw new Error('Undefined value passed at position: ' + index);
      }
    });
  }
}
