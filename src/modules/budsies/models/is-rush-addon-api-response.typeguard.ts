/* eslint-disable valid-typeof */
import RushAddonApiResponse from './rush-addon-api-response.interface';

export default function isRushAddonApiResponse (
  arg: unknown
): arg is RushAddonApiResponse {
  if (typeof arg !== 'object') {
    return false;
  }

  const tmpArg = arg as Record<string | number | symbol, unknown>;

  const fields: Record<string, string> = {
    'sku': 'string',
    'text': 'string',
    'price': 'number',
    'isDomestic': 'number'
  }

  for (const field in fields) {
    const a = fields['id'];
    if (!(field in tmpArg) || typeof tmpArg[field] !== fields[field]) {
      return false;
    }
  }

  return true;
}
