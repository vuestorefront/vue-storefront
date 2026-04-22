import { FileUploadValue } from './file-upload-value';

export interface CustomizationStateItem {
  customization_id: string,
  quantity?: number,
  value: string | string[] | FileUploadValue | FileUploadValue[]
}
