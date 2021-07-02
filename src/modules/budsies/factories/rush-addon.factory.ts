import ObjectBuilderInterface from '../types/object-builder.interface';
import RushAddon from '../models/rush-addon.model';
import RushAddonApiResponse from '../models/rush-addon-api-response.interface';

const factory: ObjectBuilderInterface<RushAddon, RushAddonApiResponse> = (data) => {
  const value = new RushAddon(
    data.sku,
    data.text,
    +data.price,
    !!data.isDomestic,
    false
  );

  return value;
}

export default factory;
