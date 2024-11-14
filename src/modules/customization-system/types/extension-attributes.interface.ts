import { CustomizationStateItem } from './customization-state-item.interface';
import { EstimatedShipment } from './estimated-shipment.interface';

export interface ExtensionAttributes {
  customization_state?: CustomizationStateItem[],
  plushie_id?: string,
  estimated_shipment?: EstimatedShipment
}
