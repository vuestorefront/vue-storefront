export default class ExtraPhotoAddon {
  public constructor (
    public readonly id: string,
    public readonly label: string,
    public readonly value: number,
    public readonly isNew = true
  ) {
    [id, label, value, isNew].forEach((arg, index) => {
      if (arg === undefined) {
        throw new Error(`Undefined value passed at position: ${index}`);
      }
    });
  }
}
