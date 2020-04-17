/* istanbul ignore file */

import { UserOrderGetters } from '@vue-storefront/core';
import { BapiOrder, BapiLineItem } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDate = (order: BapiOrder): string => '123';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getId = (order: BapiOrder): string => '123';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStatus = (order: BapiOrder): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getPrice = (order: BapiOrder): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItems = (order: BapiOrder): BapiLineItem[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemSku = (item: BapiLineItem): string => 'sku-1';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemName = (item: BapiLineItem): string => 'bapi-line-item-1';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemQty = (item: BapiLineItem): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number) => String(price);

const orderGetters: UserOrderGetters<BapiOrder, BapiLineItem> = {
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
