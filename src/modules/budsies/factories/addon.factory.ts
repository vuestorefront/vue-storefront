import ObjectBuilderInterface from '../types/object-builder.interface';
import Addon from '../models/addon.model';
import AddonApiResponse from '../models/addon-api-response.interface';

const factory: ObjectBuilderInterface<Addon, AddonApiResponse> = (data) => {
  const value = new Addon(
    data.sku,
    data.label,
    +data.qty,
    false
  );

  return value;
}

export default factory;
