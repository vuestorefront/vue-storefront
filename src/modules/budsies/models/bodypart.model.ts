export default class Bodypart {
  public constructor (
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly isRequired: boolean,
    public readonly maxValues: number,
    public readonly sn: number,
    public readonly isNew = true,
    public readonly detailingFlagText?: string,
    public readonly childrenBodyparts?: Bodypart[]
  ) {
    [id, code, name, isRequired, maxValues, sn, isNew].forEach((arg, index) => {
      if (arg === undefined) {
        throw new Error(`Undefined value passed at position: ${index}`);
      }
    });
  }
}
