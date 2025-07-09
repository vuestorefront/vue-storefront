import { Order } from '../order';

export interface OrdersHistoryState {
  orders: Order[],
  suggestedProductsIds: number[],
  isReorderingItem: boolean
}
