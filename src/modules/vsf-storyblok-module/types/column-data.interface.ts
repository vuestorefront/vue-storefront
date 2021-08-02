import ItemData from './item-data.interface';
import { ColumnsCountField } from './columns-count-field.type';

export default interface ColumnData extends ItemData {
  items: any[],
  span?: ColumnsCountField
}
