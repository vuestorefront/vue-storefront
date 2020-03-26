import { UserOrderGetters, AgnosticOrderStatus } from '@vue-storefront/interfaces';
import { Order, OrderState } from './../types/GraphQL';

export const getOrderDate = (order: Order): string => order?.createdAt || '';

export const getOrderId = (order: Order): string => order?.id || '';

const orderStatusMap = {
  [OrderState.Open]: AgnosticOrderStatus.Open,
  [OrderState.Confirmed]: AgnosticOrderStatus.Confirmed,
  [OrderState.Complete]: AgnosticOrderStatus.Complete,
  [OrderState.Cancelled]: AgnosticOrderStatus.Cancelled
};

export const getOrderStatus = (order: Order): AgnosticOrderStatus | '' => order?.orderState ? orderStatusMap[order.orderState] : '';

export const getOrderPrice = (order: Order): number | null => order ? order.totalPrice.centAmount / 100 : null;

const orderGetters: UserOrderGetters<Order> = {
  getDate: getOrderDate,
  getId: getOrderId,
  getStatus: getOrderStatus,
  getPrice: getOrderPrice
};

export default orderGetters;
