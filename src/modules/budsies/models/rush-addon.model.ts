export default class RushAddon {
  public constructor (
    public readonly id: string,
    public readonly text: string,
    public readonly price: number,
    public readonly isDomestic: boolean,
    public readonly isNew = true
  ) {
    [id, text, price, isDomestic, isNew].forEach((arg, index) => {
      if (arg === undefined) {
        throw new Error(`Undefined value passed at position: ${index}`);
      }
    });
  }
}
