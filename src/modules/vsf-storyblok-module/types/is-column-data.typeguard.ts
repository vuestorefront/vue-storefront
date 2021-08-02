/* eslint-disable valid-typeof */
import ColumnData from './column-data.interface';

export default function isColumnData (
  arg: unknown
): arg is ColumnData {
  if (typeof arg !== 'object') {
    return false;
  }

  const tmpArg = arg as Record<string | number | symbol, unknown>;

  if (tmpArg.component !== 'column') {
    return false;
  }

  return Array.isArray(tmpArg.items);
}
