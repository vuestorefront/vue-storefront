import {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getShippingMethodPrice
} from './../../src/getters/checkoutGetters';

describe('[commercetools-getters] shipping method', () => {
  it('returns shipping method id', () => {
    expect(getShippingMethodId(null)).toEqual('');
    expect(getShippingMethodId({ id: '123' } as any)).toEqual('123');
  });

  it('returns shipping method name', () => {
    expect(getShippingMethodName(null)).toEqual('');
    expect(getShippingMethodName({ name: 'method1' } as any)).toEqual('method1');
  });

  it('returns shipping method description', () => {
    expect(getShippingMethodDescription(null)).toEqual('');
    expect(getShippingMethodDescription({ localizedDescription: 'description' } as any)).toEqual('description');
  });

  it('returns shipping method price', () => {
    expect(getShippingMethodPrice(null)).toEqual(null);
    expect(getShippingMethodPrice({
      zoneRates: [
        { shippingRates: [{ price: { centAmount: 9345 } }] }
      ]
    } as any)).toEqual(93.45);
  });
});
