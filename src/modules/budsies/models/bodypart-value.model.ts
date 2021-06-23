export default class BodypartValue {
  public constructor (
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly contentTypeId: number,
    public readonly isDefault: boolean,
    public readonly sn: number,
    public readonly color: string | undefined = undefined,
    public readonly image: string | undefined = undefined,
    public readonly isNew = true
  ) {
    [id, code, name, contentTypeId, isDefault, sn, isNew].forEach((arg, index) => {
      if (arg === undefined) {
        throw new Error(`Undefined value passed at position: ${index}`);
      }
    });
  }
}
