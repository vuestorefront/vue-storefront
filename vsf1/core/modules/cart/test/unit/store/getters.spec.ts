import cartGetters from '../../../store/getters';
import { onlineHelper } from '@vue-storefront/core/helpers'
import config from 'config'

jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/lib/storage-manager', () => jest.fn())
jest.mock('@vue-storefront/core/app', () => jest.fn())
jest.mock('@vue-storefront/core/lib/multistore', () => jest.fn())
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/core/helpers', () => ({
  onlineHelper: {
    get isOnline () {
      return true
    }
  }
}));

describe('Cart getters', () => {
  const isOnlineSpy = jest.spyOn(onlineHelper, 'isOnline', 'get');

  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(config).forEach((key) => { delete config[key]; });
  });

  it('totals returns platform total segments if they has been saved in store and client is online', () => {
    const stateMock = {
      platformTotalSegments: [
        { 'code': 'subtotal', 'title': 'Subtotal', 'value': 39.36 },
        { 'code': 'shipping', 'title': 'Shipping & Handling (Flat Rate - Fixed)', 'value': 5 },
        { 'code': 'discount', 'title': 'Discount', 'value': -4.8 },
        { 'code': 'tax',
          'title': 'Tax',
          'value': 6.26,
          'area': 'taxes',
          'extension_attributes': {
            'tax_grandtotal_details': [{
              'amount': 6.26,
              'rates': [{ 'percent': '23', 'title': 'VAT23-PL' }],
              'group_id': 1
            }]
          } },
        { 'code': 'grand_total', 'title': 'Grand Total', 'value': 38.46, 'area': 'footer' }
      ]
    };
    const wrapper = (getters: any) => getters.getTotals(stateMock, getters);

    expect(wrapper(cartGetters)).toEqual(stateMock.platformTotalSegments);
  });

  it(`totals returns totals without shipping and payment prices having neither platformTotalSegments
  nor additional prices`, () => {
    const stateMock = {
      cartItems: [
        { qty: 1, price_incl_tax: 1 },
        { qty: 2, price_incl_tax: 2 }
      ]
    };
    const wrapper = (getters: any) => getters.getTotals(stateMock, {
      ...getters,
      getFirstShippingMethod: getters.getFirstShippingMethod(stateMock),
      getFirstPaymentMethod: getters.getFirstPaymentMethod(stateMock)
    });

    expect(wrapper(cartGetters)).toEqual([
      { 'code': 'subtotal_incl_tax', 'title': 'Subtotal incl. tax', 'value': 5 },
      { 'code': 'grand_total', 'title': 'Grand total', 'value': 5 }
    ]);
  });

  it(`totals returns totals even when there are platform total segments but client is offline`, () => {
    isOnlineSpy.mockReturnValueOnce(false);
    const stateMock = {
      platformTotalSegments: [
        { 'code': 'subtotal', 'title': 'Subtotal', 'value': 39.36 },
        { 'code': 'shipping', 'title': 'Shipping & Handling (Flat Rate - Fixed)', 'value': 5 }
      ],
      cartItems: [
        { qty: 1, price_incl_tax: 1 },
        { qty: 2, price_incl_tax: 2 }
      ]
    };
    const wrapper = (getters: any) => getters.getTotals(stateMock, {
      ...getters,
      getFirstShippingMethod: getters.getFirstShippingMethod(stateMock),
      getFirstPaymentMethod: getters.getFirstPaymentMethod(stateMock)
    });

    expect(wrapper(cartGetters)).toEqual([
      { 'code': 'subtotal_incl_tax', 'title': 'Subtotal incl. tax', 'value': 5 },
      { 'code': 'grand_total', 'title': 'Grand total', 'value': 5 }
    ]);
  });

  it(`totals returns totals including shipping and payment prices having these prices in store
  but no platformTotalSegments`, () => {
    const stateMock = {
      cartItems: [
        { qty: 1, price_incl_tax: 1 },
        { qty: 2, price_incl_tax: 2 }
      ],
      payment: {
        title: 'payment',
        cost_incl_tax: 4
      },
      shipping: {
        method_title: 'shipping',
        price_incl_tax: 8
      }
    };
    const wrapper = (getters: any) => getters.getTotals(stateMock, {
      ...getters,
      getFirstShippingMethod: getters.getFirstShippingMethod(stateMock),
      getFirstPaymentMethod: getters.getFirstPaymentMethod(stateMock)
    });

    expect(wrapper(cartGetters)).toEqual([
      { 'code': 'subtotal_incl_tax', 'title': 'Subtotal incl. tax', 'value': 5 },
      { 'code': 'grand_total', 'title': 'Grand total', 'value': 21 },
      { 'code': 'payment', 'title': 'payment', 'value': 4 },
      { 'code': 'shipping', 'title': 'shipping', 'value': 8 }
    ]);
  });

  it(`totals returns totals including first shipping and first payment prices having multiple prices in store
  but no platformTotalSegments`, () => {
    const stateMock = {
      cartItems: [
        { qty: 1, price_incl_tax: 1 },
        { qty: 2, price_incl_tax: 2 }
      ],
      payment: [
        {
          title: 'payment',
          cost_incl_tax: 4
        },
        {
          title: 'another-payment',
          cost_incl_tax: 16
        }
      ],
      shipping: [
        {
          method_title: 'shipping',
          price_incl_tax: 8
        },
        {
          method_title: 'another-shipping',
          price_incl_tax: 32
        }
      ]
    };
    const wrapper = (getters: any) => getters.getTotals(stateMock, {
      ...getters,
      getFirstShippingMethod: getters.getFirstShippingMethod(stateMock),
      getFirstPaymentMethod: getters.getFirstPaymentMethod(stateMock)
    });

    expect(wrapper(cartGetters)).toEqual([
      { 'code': 'subtotal_incl_tax', 'title': 'Subtotal incl. tax', 'value': 5 },
      { 'code': 'grand_total', 'title': 'Grand total', 'value': 21 },
      { 'code': 'payment', 'title': 'payment', 'value': 4 },
      { 'code': 'shipping', 'title': 'shipping', 'value': 8 }
    ]);
  });

  it('totalQuantity returns total quantity of all products in cart if minicart configuration is set to quantities', () => {
    config.cart = {
      minicartCountType: 'quantities'
    }
    const stateMock = {
      cartItems: [
        { qty: 1 },
        { qty: 2 }
      ]
    };

    const wrapper = (getters: any) => getters.getItemsTotalQuantity(stateMock, {});

    expect(wrapper(cartGetters)).toBe(3);
  });

  it('totalQuantity returns number of different products instead of their sum if minicart configuration is set to items', () => {
    config.cart = {
      minicartCountType: 'items'
    }

    const stateMock = {
      cartItems: [
        { qty: 1 },
        { qty: 2 }
      ]
    };

    const wrapper = (getters: any) => getters.getItemsTotalQuantity(stateMock, {});

    expect(wrapper(cartGetters)).toBe(2);
  });

  it('coupon returns coupon information when coupon has been applied to the cart', () => {
    const stateMock = {
      platformTotals: {
        coupon_code: 'foo',
        discount_amount: 1.23
      }
    };
    const wrapper = (getters: any) => getters.getCoupon(stateMock);

    expect(wrapper(cartGetters)).toEqual({
      code: stateMock.platformTotals.coupon_code,
      discount: stateMock.platformTotals.discount_amount
    });
  });

  it('coupon returns false given no coupons applied to the cart', () => {
    const stateMock = {};
    const wrapper = (getters: any) => getters.getCoupon(stateMock);

    expect(wrapper(cartGetters)).toBe(false);
  });

  it('isVirtualCart returns true given only virtual items in cart', () => {
    const stateMock = {
      cartItems: [
        { type_id: 'virtual' },
        { type_id: 'downloadable' }
      ]
    };
    const wrapper = (getters: any) => getters.isVirtualCart(stateMock);

    expect(wrapper(cartGetters)).toBe(true);
  });

  it('isVirtualCart returns false given any non virtual items in cart', () => {
    const stateMock = {
      cartItems: [
        { type_id: 'virtual' },
        { type_id: 'definitely-not-virtual' }
      ]
    };
    const wrapper = (getters: any) => getters.isVirtualCart(stateMock);

    expect(wrapper(cartGetters)).toBe(false);
  });
});
