import { SpacingSettingsFieldName } from './spacing-setting-field-name.value';

export type SpacingSettingsField = {
  [key in SpacingSettingsFieldName]: string
}
