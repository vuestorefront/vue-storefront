import ObjectBuilderInterface from '../types/object-builder.interface';
import Bodypart from '../models/bodypart.model';
import BodypartApiResponse from '../models/bodypart-api-response.interface';

const factory: ObjectBuilderInterface<Bodypart, BodypartApiResponse> = (data) => {
  const value = new Bodypart(
    data.id + '',
    data.code,
    data.name,
    +data.is_required === 1,
    +data.max_values,
    +data.sn,
    false
  );

  return value;
}

export default factory;
