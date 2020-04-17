import {
  getOrderDate,
  getOrderId,
  getOrderStatus,
  getOrderPrice,
  getOrderItems,
  getOrderItemSku,
  getOrderItemName,
  getOrderItemQty,
  getFormattedPrice
} from './../../src/getters/orderGetters';
import { OrderState, Order } from './../../src/types/GraphQL';

const order: Order = {
  createdAt: 123456789,
  id: '645ygdf',
  orderState: OrderState.Complete,
  totalPrice: {
    centAmount: 12345,
    currencyCode: 'USD'
  },
  lineItems: [
    {
      name: 'item-1',
      productId: 'item-id-1',
      quantity: 10
    },
    {
      name: 'item-2',
      productId: 'item-id-2',
      quantity: 20
    }
  ]
} as any;

describe('[commercetools-getters] order getters', () => {
  it('returns default values', () => {
    expect(getOrderDate(null)).toBe('');
    expect(getOrderId(null)).toBe('');
    expect(getOrderStatus(null)).toBe('');
    expect(getOrderPrice(null)).toBe(0);
    expect(getOrderItems(null)).toHaveLength(0);
    expect(getOrderItemSku(null)).toBe('');
    expect(getOrderItemName(null)).toBe('');
    expect(getOrderItemQty(null)).toBe(0);
    expect(getFormattedPrice(null)).toBe(null);
  });

  it('returns date', () => {
    expect(getOrderDate(order)).toEqual(123456789);
  });

  it('returns order number', () => {
    expect(getOrderId(order)).toEqual('645ygdf');
  });

  it('returns status', () => {
    expect(getOrderStatus(order)).toEqual(OrderState.Complete);
  });

  it('returns total gross', () => {
    expect(getOrderPrice(order)).toEqual(123.45);
  });

  describe('order items', () => {
    let items;

    beforeEach(() => {
      items = getOrderItems(order);
    });

    it('returns all items', () => {
      expect(items).toHaveLength(2);
    });

    it('returns items sku', () => {
      expect(getOrderItemSku(items[0])).toBe('item-id-1');
      expect(getOrderItemSku(items[1])).toBe('item-id-2');
    });

    it('returns items name', () => {
      expect(getOrderItemName(items[0])).toBe('item-1');
      expect(getOrderItemName(items[1])).toBe('item-2');
    });

    it('returns items quantity', () => {
      expect(getOrderItemQty(items[0])).toBe(10);
      expect(getOrderItemQty(items[1])).toBe(20);
    });
  });
});
