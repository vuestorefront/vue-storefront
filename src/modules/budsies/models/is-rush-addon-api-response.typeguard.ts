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
    'price': 'number'
  }

  for (const field in fields) {
    if (!(field in tmpArg) || typeof tmpArg[field] !== fields[field]) {
      return false;
    }
  }

  if ('slotsLeft' in tmpArg && typeof tmpArg.slotsLeft !== 'number') {
    return false;
  }

  return true;
}
