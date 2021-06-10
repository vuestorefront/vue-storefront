export default class Item {
  public isNew = true;

  private fCreatedAt?: Date;

  private fId: string;
  private fType: string;
  private fUrl: string;

  public constructor (
    fId: string,
    fType: string,
    fUrl: string
  ) {
    [fId, fType, fUrl].forEach((arg, index) => {
      if (arg === undefined) {
        throw new Error('Undefined value passed at position: ' + index);
      }
    });

    this.fId = fId;
    this.fType = fType;
    this.fUrl = fUrl;
  }

  public get id () {
    return this.fId;
  }

  public get createdAt () {
    return this.fCreatedAt;
  }

  public get type () {
    return this.fType;
  }

  public get url () {
    return this.fUrl;
  }
}
