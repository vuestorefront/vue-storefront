/* eslint-disable valid-typeof */
import ColumnData from './column-data.interface';
import isItemData from './is-item-data.typeguard';

export default function isColumnData (
  arg: unknown
): arg is ColumnData {
  if (typeof arg !== 'object') {
    return false;
  }

  if (!isItemData(arg)) {
    return false;
  }

  const tmpArg = arg as unknown as Record<string | number | symbol, unknown>;

  if (tmpArg.component !== 'column') {
    return false;
  }

  return Array.isArray(tmpArg.items);
}
