import ObjectBuilderInterface from './object-builder.interface';
import Item from './item.model';

export default class FileStorageItemFactory implements ObjectBuilderInterface {
  public buildFromJSON (data: { [key: string]: any }): Item {
    const value = new Item(data.id, data.type.toString(), data.url);

    (value as any).fCreatedAt = new Date(data.createdAt);

    value.isNew = false;

    return value;
  }
}
