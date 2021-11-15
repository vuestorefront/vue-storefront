import { UserOrderGetters } from '@vue-storefront/core';
import type { Order, OrderItem } from '@vue-storefront/boilerplate-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDate(order: Order): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(order: Order): string {
  return '1';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStatus(order: Order): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(order: Order): number | null {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(order: Order): OrderItem[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: OrderItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: OrderItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: OrderItem): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: OrderItem): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line
function getOrdersTotal(orders: any): number {
  return 1;
}

export const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal
};
