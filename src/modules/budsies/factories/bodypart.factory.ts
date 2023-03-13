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
    false,
    data.detailing_flag_text,
    data.child_bodyparts
      ? data.child_bodyparts.map((bodyPart) => {
        return new Bodypart(
          bodyPart.id + '',
          bodyPart.code,
          bodyPart.name,
          +bodyPart.is_required === 1,
          +bodyPart.max_values,
          +bodyPart.sn,
          false
        )
      })
      : undefined
  );

  return value;
}

export default factory;
