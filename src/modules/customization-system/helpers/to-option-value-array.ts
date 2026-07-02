import { CustomizationOptionValue } from '../types/customization-option-value';
import { FileUploadValue } from '../types/file-upload-value';

export function toOptionValueArray (value: CustomizationOptionValue): (string | FileUploadValue)[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}
