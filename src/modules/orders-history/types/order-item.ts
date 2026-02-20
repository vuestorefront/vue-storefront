import { OrderItemAvailableAction } from './order-item-available-action';
import { OrderItemShipment } from './order-item-shipment';
import { OrderItemExtensionAttributes } from './order-item-extension-attributes';
import { ProgressTrackerData } from './progress-tracker-data';

interface OrderItemProduct {
  id: number,
  sku: string,
  name: string,
  image: string,
  small_image: string,
  thumbnail: string,
  related_alteration_product?: Omit<OrderItemProduct, 'related_alteration_product'>
}

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
