import ObjectBuilderInterface from '../budsies/types/object-builder.interface';
import Item from './item.model';
import ItemApiResponse from './item-api-response.interface';

const factory: ObjectBuilderInterface<Item, ItemApiResponse> = (data) => {
  return new Item(
    data.id,
    data.type.toString(),
    data.url,
    new Date(data.createdAt),
    false
  );
}

export default factory;
