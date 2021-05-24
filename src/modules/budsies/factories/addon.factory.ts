import ObjectBuilderInterface from '../types/object-builder.interface';
import Addon from '../models/addon.model';

export default class AddonFactory
implements ObjectBuilderInterface<Addon> {
  public buildFromJSON (data: { [key: string]: any }): Addon {
    const value = new Addon(
      data.sku,
      data.label,
      +data.qty
    );

    value.isNew = false;

    return value;
  }
}
