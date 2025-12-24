import { OrderAddress } from './order-address';
import { OrderItem } from './order-item';

export interface Order {
  entity_id: number,
  increment_id: string,
  created_at: string,
  updated_at: string,
  store_id: number,
  items: OrderItem[],
  // TODO: replace with `shipping_address`
  order_address: OrderAddress
}
