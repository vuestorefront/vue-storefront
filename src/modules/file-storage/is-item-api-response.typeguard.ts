/* eslint-disable valid-typeof */
import ItemApiResponse from './item-api-response.interface';

export default function isItemApiResponse (
  arg: unknown
): arg is ItemApiResponse {
  if (typeof arg !== 'object') {
    return false;
  }

  const tmpArg = arg as Record<string | number | symbol, unknown>;

  const fields: Record<string, string> = {
    'id': 'string',
    'type': 'number',
    'url': 'string',
    'createdAt': 'string'
  }

  for (const field in fields) {
    const a = fields['id'];
    if (!(field in tmpArg) || typeof tmpArg[field] !== fields[field]) {
      return false;
    }
  }

  return true;
}
