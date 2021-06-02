import getProductPrice from './../../../helpers/getProductPrice';
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';
import { onlineHelper } from '@vue-storefront/core/helpers'
import config from 'config';

jest.mock('@vue-storefront/core/helpers', () => ({
  onlineHelper: {
    get isOnline () {
      return true
    }
  },
  once: jest.fn()
}));

describe('Cart getProductPrice', () => {
  const isOnlineSpy = jest.spyOn(onlineHelper, 'isOnline', 'get');

  it('returns empty prices', () => {
    const result = getProductPrice(null);
    const expectedResult = {
      special: '',
      original: '',
      regular: ''
    };

    expect(result).toEqual(expectedResult);
  });

  it('returns prices when display item discount is not displayed', () => {
    isOnlineSpy.mockReturnValueOnce(false);
    config.cart.displayItemDiscounts = false;
    const mockedProduct = {
      price_incl_tax: 24,
      original_price_incl_tax: 24,
      qty: 1
    } as any as CartItem;

    const result = getProductPrice(mockedProduct);
    const expectedResult = {
      special: 24,
      original: 24,
      regular: 24
    };

    expect(result).toEqual(expectedResult);
  });

  it('returns prices when original price is 0', () => {
    isOnlineSpy.mockReturnValueOnce(false);
    config.cart.displayItemDiscounts = true;
    const mockedProduct = {
      price_incl_tax: 24,
      original_price_incl_tax: 0,
      qty: 1
    } as any as CartItem;

    const result = getProductPrice(mockedProduct);
    const expectedResult = {
      special: 24,
      original: 0,
      regular: 24
    };

    expect(result).toEqual(expectedResult);
  });

  it('returns totals prices without tax and without coupon', () => {
    isOnlineSpy.mockReturnValueOnce(true);
    config.tax.finalPriceIncludesTax = false;
    config.cart.displayItemDiscounts = true;
    const mockedProduct = {
      price_incl_tax: 24,
      original_price_incl_tax: 24,
      totals: {
        row_total: 24,
        discount_amount: 0
      },
      qty: 1
    } as any as CartItem;

    const result = getProductPrice(mockedProduct);
    const expectedResult = {
      special: 24,
      original: 24,
      regular: 24
    };

    expect(result).toEqual(expectedResult);
  });

  it('returns totals prices without tax and with coupon', () => {
    isOnlineSpy.mockReturnValueOnce(true);
    config.tax.finalPriceIncludesTax = false;
    config.cart.displayItemDiscounts = true;
    const mockedProduct = {
      price_incl_tax: 24,
      original_price_incl_tax: 24,
      totals: {
        row_total: 24,
        discount_amount: 5
      },
      qty: 1
    } as any as CartItem;

    const result = getProductPrice(mockedProduct);
    const expectedResult = {
      special: 19,
      original: 24,
      regular: 24
    };

    expect(result).toEqual(expectedResult);
  });

  it('returns totals prices with tax and without coupon', () => {
    isOnlineSpy.mockReturnValueOnce(true);
    config.tax.finalPriceIncludesTax = true;
    config.cart.displayItemDiscounts = true;
    const mockedProduct = {
      price_incl_tax: 24,
      original_price_incl_tax: 24,
      totals: {
        row_total: 24,
        row_total_incl_tax: 25.98,
        tax_amount: 1.98,
        discount_amount: 0
      },
      qty: 1
    } as any as CartItem;

    const result = getProductPrice(mockedProduct);
    const expectedResult = {
      special: 25.98,
      original: 25.98,
      regular: 25.98
    };

    expect(result).toEqual(expectedResult);
  });

  it('returns totals prices with tax and with coupon', () => {
    isOnlineSpy.mockReturnValueOnce(true);
    config.tax.finalPriceIncludesTax = true;
    config.cart.displayItemDiscounts = true;
    const mockedProduct = {
      price_incl_tax: 24,
      original_price_incl_tax: 24,
      totals: {
        row_total: 24,
        row_total_incl_tax: 25.98,
        tax_amount: 1.57,
        discount_amount: 5
      },
      qty: 1
    } as any as CartItem;

    const result = getProductPrice(mockedProduct);
    const expectedResult = {
      special: 20.57,
      original: 25.98,
      regular: 25.98
    };

    expect(result).toEqual(expectedResult);
  });

  it('returns regular price', () => {
    isOnlineSpy.mockReturnValueOnce(true);
    const mockedProduct = {
      regular_price: 24,
      qty: 1
    } as any as CartItem;

    const result = getProductPrice(mockedProduct);
    const expectedResult = {
      special: '',
      original: '',
      regular: 24
    };

    expect(result).toEqual(expectedResult);
  })
});
