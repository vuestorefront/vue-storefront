import { UserOrderGetters, AgnosticOrderStatus } from '@vue-storefront/core';
import { Order, OrderState, LineItem } from './../types/GraphQL';
import { createFormatPrice } from './_utils';

export const getOrderDate = (order: Order): string => order?.createdAt || '';

export const getOrderId = (order: Order): string => order?.id || '';

const orderStatusMap = {
  [OrderState.Open]: AgnosticOrderStatus.Open,
  [OrderState.Confirmed]: AgnosticOrderStatus.Confirmed,
  [OrderState.Complete]: AgnosticOrderStatus.Complete,
  [OrderState.Cancelled]: AgnosticOrderStatus.Cancelled
};

export const getOrderStatus = (order: Order): AgnosticOrderStatus | '' => order?.orderState ? orderStatusMap[order.orderState] : '';

export const getOrderPrice = (order: Order): number => order ? order.totalPrice.centAmount / 100 : 0;

export const getOrderItems = (order: Order): LineItem[] => order?.lineItems || [];

export const getOrderItemSku = (item: LineItem): string => item?.productId || '';

export const getOrderItemName = (item: LineItem): string => item?.name || '';

export const getOrderItemQty = (item: LineItem): number => item?.quantity || 0;

export const getFormattedPrice = (price: number) => createFormatPrice(price);

const orderGetters: UserOrderGetters<Order, LineItem> = {
  getDate: getOrderDate,
  getId: getOrderId,
  getStatus: getOrderStatus,
  getPrice: getOrderPrice,
  getItems: getOrderItems,
  getItemSku: getOrderItemSku,
  getItemName: getOrderItemName,
  getItemQty: getOrderItemQty,
  getFormattedPrice
};

export default orderGetters;
