import { Alignment } from './alignment.value';
import ColorPickerField from './color-picker-field.interface';
import { Display } from './display.value';
import { ImageModifier } from './image-modifier.value';
import { SpacingSettingsField } from './spacing-settings-field.type';

export default interface ItemData {
  _uid: string,
  alignment: Alignment,
  spacing_settings: SpacingSettingsField,
  css_classes?: string,
  display?: Display,
  background?: ColorPickerField,
  image_modifiers?: ImageModifier[]
}
