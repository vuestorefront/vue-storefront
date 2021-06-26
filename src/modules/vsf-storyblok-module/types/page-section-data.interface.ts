import ColorPickerField from './color-picker-field.interface';
import { Display } from './display.value';
import ItemData from './item-data.interface';
import { SectionWidth } from './section-width.value';

export default interface PageSectionData extends ItemData {
  items: any[],
  width: SectionWidth,
  display: Display,
  background: ColorPickerField

}
