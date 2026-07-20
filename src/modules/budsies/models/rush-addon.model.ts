export default class RushAddon {
  public constructor (
    public readonly id: string,
    public readonly text: string,
    public readonly price: number,
    public readonly turnaroundTime: number = 42,
    public readonly isNew = true,
    public readonly slotsLeft?: number
  ) {
    [id, text, price, isNew].forEach((arg, index) => {
      if (arg === undefined) {
        throw new Error(`Undefined value passed at position: ${index}`);
      }
    });
  }
}
