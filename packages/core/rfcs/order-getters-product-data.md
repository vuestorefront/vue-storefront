# Add more data to the Order getters

## Motivation

In case of showing completed order items, we need a getter for its items any possibility to get additional information about each product:
- name
- quantity bought
- price
- sku

In this RFC is also proposed price as an agnostic unit

## Proposed interface
```TS
export interface UserOrderGetters<ORDER, ORDER_ITEM> {
  getDate: (order: ORDER) => string;
  getId: (order: ORDER) => string;
  getStatus: (order: ORDER) => string;
  getPrice: (order: ORDER) => number;
  getItems: (order: ORDER) => ORDER_ITEM[];
  getItemSku: (item: ORDER_ITEM) => string;
  getItemName: (item: ORDER_ITEM) => string;
  getItemQty: (item: ORDER_ITEM) => number;
  [getterName: string]: (element: any, options?: any) => unknown;
}
```