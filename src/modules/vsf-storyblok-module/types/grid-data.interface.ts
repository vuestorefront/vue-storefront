import ItemData from './item-data.interface';
import { ColumnsCountField } from './columns-count-field.type';
import { Display } from './display.value';
import ColorPickerField from './color-picker-field.interface';

export default interface GridData extends ItemData {
  items: any[],
  columns_count: ColumnsCountField,
  display: Display,
  background: ColorPickerField,
  is_cards_mode?: boolean,
  is_collapsed?: boolean,
  card_background: ColorPickerField,
  vertical_alignment?: string
}
