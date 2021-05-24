import { Value } from './value.interface';

export class ValueCollection<T extends Value> {
  private fItems: { [key: string]: T } = {};
  private fItemsOrder: string[] = [];

  public constructor (items: T[]) {
    this.setItems(items);
  }

  public getById (id: string): T | undefined {
    return this.fItems[id];
  }

  public getByIndex (index: number): T | undefined {
    const id = this.fItemsOrder[index];

    return this.fItems[id];
  }

  public getFirstByFieldValue (field: string, value: any): T | undefined {
    return this.getItems().find((item) => (item as any)[field] === value);
  }

  public getItems (): T[] {
    const result: T[] = [];

    this.fItemsOrder.forEach((id) => {
      result.push(this.fItems[id]);
    });

    return result;
  }

  public get length (): number {
    return this.fItemsOrder.length;
  }

  public addItem (item: T) {
    if (this.fItems[item.id] != null) {
      this.fItems[item.id] = item;
    } else {
      this.fItems[item.id] = item;
      this.fItemsOrder.push(item.id);
    }
  }

  public getIndexOf (id: string): number {
    return this.fItemsOrder.indexOf(id);
  }

  private setItems (items: T[]) {
    const hash: { [key: string]: T } = {};
    const order: string[] = [];

    items.forEach((item) => {
      hash[item.id] = item;
      order.push(item.id);
    });

    this.fItems = hash;
    this.fItemsOrder = order;
  }
}
