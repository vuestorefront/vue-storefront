import { CustomizationStateItem } from './customization-state-item.interface';

export interface PersistedData {
  customizationState: CustomizationStateItem[],
  additionalData?: Record<string, any>
}
