/* eslint-disable valid-typeof */
import BodypartApiResponse from './bodypart-api-response.interface';

export default function isBodypartApiResponse (
  arg: unknown
): arg is BodypartApiResponse {
  if (typeof arg !== 'object') {
    return false;
  }

  const tmpArg = arg as Record<string | number | symbol, unknown>;

  const fields: Record<string, string> = {
    'id': 'number',
    'code': 'string',
    'name': 'string',
    'is_required': 'number',
    'max_values': 'number',
    'sn': 'number'
  }

  for (const field in fields) {
    if (!(field in tmpArg) || typeof tmpArg[field] !== fields[field]) {
      return false;
    }
  }

  return true;
}
