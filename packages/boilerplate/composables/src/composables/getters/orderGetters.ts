/* istanbul ignore file */

import { UserOrderGetters } from '@vue-storefront/core';
import { Order, OrderItem } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDate = (order: Order): string => '123';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getId = (order: Order): string => '123';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStatus = (order: Order): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getPrice = (order: Order): number | null => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (order: Order): OrderItem[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemSku = (item: OrderItem): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemName = (item: OrderItem): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemQty = (item: OrderItem): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number) => String(price);

const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getFormattedPrice
};

export default orderGetters;
