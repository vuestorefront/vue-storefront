import { FileUploadValue } from '../types/file-upload-value';
import { isFileUploadValue } from '../types/is-file-upload-value.typeguard';

export function getOptionValueId (value: string | FileUploadValue): string {
  return isFileUploadValue(value) ? value.id : value;
}
