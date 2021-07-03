import ObjectBuilderInterface from '../types/object-builder.interface';
import ExtraPhotoAddon from '../models/extra-photo-addon.model';
import ExtraPhotoAddonApiResponse from '../models/extra-photo-addon-api-response.interface';

const factory: ObjectBuilderInterface<ExtraPhotoAddon, ExtraPhotoAddonApiResponse> = (data) => {
  const value = new ExtraPhotoAddon(
    data.sku,
    data.label,
    +data.qty,
    false
  );

  return value;
}

export default factory;
