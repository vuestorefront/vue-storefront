import {
  getOrderDate,
  getOrderId,
  getOrderStatus,
  getOrderPrice
} from './../../src/getters/orderGetters';
import { OrderState, Order } from './../../src/types/GraphQL';

const order: Order = {
  createdAt: 123456789,
  id: '645ygdf',
  orderState: OrderState.Complete,
  totalPrice: {
    centAmount: 12345,
    currencyCode: 'USD'
  }
} as any;

describe('[commercetools-getters] order getters', () => {
  it('returns default values', () => {
    expect(getOrderDate(null)).toBe('');
    expect(getOrderId(null)).toBe('');
    expect(getOrderStatus(null)).toBe('');
    expect(getOrderPrice(null)).toBe(null);
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
});
