/* eslint-disable valid-typeof */
import BodypartValueApiResponse from './bodypart-value-api-response.interface';

export default function isBodypartValueApiResponse (
  arg: unknown
): arg is BodypartValueApiResponse {
  if (typeof arg !== 'object') {
    return false;
  }

  const tmpArg = arg as Record<string | number | symbol, unknown>;

  const fields: Record<string, string[]> = {
    'id': ['number'],
    'code': ['string'],
    'name': ['string'],
    'content_type_id': ['number'],
    'color': ['string', 'object'],
    'image': ['string', 'object'],
    'is_default': ['number'],
    'sn': ['number']
  }

  for (const field in fields) {
    if (!(field in tmpArg) || !fields[field].includes(typeof tmpArg[field])) {
      return false;
    }
  }

  return true;
}
