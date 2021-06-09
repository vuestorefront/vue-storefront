import { MutableValue } from '../types/mutable-value.interface';

export default class Addon implements MutableValue {
  public isNew = true;
  public id;

  public label: string;
  public value: number;

  public constructor (
    fId: string,
    fLabel: string,
    fValue: number
  ) {
    [fId, fLabel, fValue].forEach((arg, index) => {
      if (arg === undefined) {
        throw new Error(`Undefined value passed at position: ${index}`);
      }
    });

    this.id = fId;
    this.label = fLabel;
    this.value = fValue;
  }
}
