import { CustomizationStateItem } from './customization-state-item.interface';
import { EstimatedShipment } from './estimated-shipment.interface';
import { ProductPurchaseFlow } from 'src/modules/shared';

export interface ExtensionAttributes {
  customization_state?: CustomizationStateItem[],
  flow?: ProductPurchaseFlow,
  plushie_id?: string,
  estimated_shipment?: EstimatedShipment,
  is_virtual_item?: boolean,
  budsies_quote_item_totals?: {
    regular_price?: number,
    final_price?: number
  }
}
