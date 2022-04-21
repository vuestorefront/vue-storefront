import ObjectBuilderInterface from '../types/object-builder.interface';
import BodypartValue from '../models/bodypart-value.model';
import BodypartValueApiResponse from '../models/bodypart-value-api-response.interface';

const factory: ObjectBuilderInterface<BodypartValue, BodypartValueApiResponse> = (data) => {
  const value = new BodypartValue(
    data.id + '',
    data.code,
    data.name,
    +data.content_type_id,
    +data.is_default === 1,
    +data.sn,
    data.color,
    data.image,
    data.group,
    false
  );

  return value;
}

export default factory;
