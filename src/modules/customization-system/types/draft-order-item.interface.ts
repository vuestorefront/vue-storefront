import { BudsieStatus } from 'src/modules/shared';

import { CustomizationStateItem } from './customization-state-item.interface';

export interface DraftOrderItem {
  id: number,
  customization_state: CustomizationStateItem[],
  product_sku?: string,
  status_id: BudsieStatus
}
