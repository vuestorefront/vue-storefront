import { CustomizationStateItem } from './customization-state-item.interface';

export interface DraftOrderItem {
  id: string,
  customization_state: CustomizationStateItem[],
  product_sku: string,
  is_customized: boolean
}
