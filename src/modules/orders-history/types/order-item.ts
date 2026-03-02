import { OrderItemAvailableAction } from './order-item-available-action';
import { OrderItemShipment } from './order-item-shipment';
import { OrderItemExtensionAttributes } from './order-item-extension-attributes';
import { ProgressTrackerData } from './progress-tracker-data';
import { OrderItemProduct } from './order-item-product';

export interface OrderItem {
  display_id: number,
  quantity: number,
  estimated_shipment_date: string,
  product: OrderItemProduct,
  progress_tracker: ProgressTrackerData,
  available_actions: OrderItemAvailableAction[],
  shipments: OrderItemShipment[],
  extension_attributes?: OrderItemExtensionAttributes,
  item_id: number
}
