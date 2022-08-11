/* eslint-disable valid-typeof */
import ItemData from './item-data.interface';

export default function isItemData (
  arg: unknown
): arg is ItemData {
  if (typeof arg !== 'object') {
    return false;
  }

  const tmpArg = arg as Record<string | number | symbol, unknown>;

  const fields: Record<string, string> = {
    '_uid': 'string',
    'alignment': 'string',
    'spacing_settings': 'object'
  }

  for (const field in fields) {
    const a = fields['id'];
    if (!(field in tmpArg) || typeof tmpArg[field] !== fields[field]) {
      return false;
    }
  }

  return true;
}
