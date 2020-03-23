import {
  getOrderDate,
  getOrderNumber,
  getOrderStatus,
  getOrderTotal
} from '../src';
import { OrderState, Order } from '../src/types/GraphQL';

const order: Order = {
  createdAt: 123456789,
  id: '645ygdf',
  orderState: OrderState.Complete,
  totalPrice: {
    centAmount: 12345,
    currencyCode: 'USD'
  }
} as any;

describe('[commercetools-helpers] order helpers', () => {
  it('returns default values', () => {
    expect(getOrderDate(null)).toBe('');
    expect(getOrderNumber(null)).toBe('');
    expect(getOrderStatus(null)).toBe('');
    expect(getOrderTotal(null)).toBe(null);
  });

  it('returns date', () => {
    expect(getOrderDate(order)).toEqual(123456789);
  });

  it('returns order number', () => {
    expect(getOrderNumber(order)).toEqual('645ygdf');
  });

  it('returns status', () => {
    expect(getOrderStatus(order)).toEqual(OrderState.Complete);
  });

  it('returns total gross', () => {
    expect(getOrderTotal(order)).toEqual(123.45);
  });
});
