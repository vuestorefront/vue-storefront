/* eslint-disable valid-typeof */
import ExtraPhotoAddonApiResponse from './extra-photo-addon-api-response.interface';

export default function isExtraPhotoAddonApiResponse (
  arg: unknown
): arg is ExtraPhotoAddonApiResponse {
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
