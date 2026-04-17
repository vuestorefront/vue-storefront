import { FileUploadValue } from './file-upload-value';

export interface CustomizationStateItem {
  customization_id: string,
  qty?: number,
  value: string | string[] | FileUploadValue | FileUploadValue[]
}
