import { Order } from './Order';

export interface OptimizedOrder extends Omit<Order, 'products'> {
  products: {
    server_item_id: number
  }[]
}
