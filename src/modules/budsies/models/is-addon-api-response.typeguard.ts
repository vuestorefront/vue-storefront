/* eslint-disable valid-typeof */
import AddonApiResponse from './addon-api-response.interface';

export default function isAddonApiResponse (
  arg: unknown
): arg is AddonApiResponse {
  if (typeof arg !== 'object') {
    return false;
  }

  const tmpArg = arg as Record<string | number | symbol, unknown>;

  const fields: Record<string, string> = {
    'sku': 'string',
    'label': 'string',
    'qty': 'number'
  }

  for (const field in fields) {
    const a = fields['id'];
    if (!(field in tmpArg) || typeof tmpArg[field] !== fields[field]) {
      return false;
    }
  }

  return true;
}
