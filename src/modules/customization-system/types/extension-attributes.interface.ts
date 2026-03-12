import { CustomizationStateItem } from './customization-state-item.interface';
import { CustomizationAvailabilityFlow } from './customization-availability-flow.type';
import { EstimatedShipment } from './estimated-shipment.interface';

export interface ExtensionAttributes {
  customization_state?: CustomizationStateItem[],
  flow?: CustomizationAvailabilityFlow,
  plushie_id?: string,
  estimated_shipment?: EstimatedShipment,
  is_virtual_item?: boolean
}
