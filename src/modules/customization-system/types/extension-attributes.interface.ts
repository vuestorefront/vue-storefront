import { CustomizationStateItem } from './customization-state-item.interface';
import { EstimatedShipment } from './estimated-shipment.interface';
import { ProductPurchaseFlow } from './product-purchase-flow.type';

export interface ExtensionAttributes {
  customization_state?: CustomizationStateItem[],
  flow?: ProductPurchaseFlow,
  plushie_id?: string,
  estimated_shipment?: EstimatedShipment,
  is_virtual_item?: boolean
}
