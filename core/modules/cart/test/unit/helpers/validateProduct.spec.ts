import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import validateProduct from '@vue-storefront/core/modules/cart/helpers/validateProduct'

jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/lib/multistore', () => jest.fn())

describe('Cart validateProduct', () => {
  it('returns error about unknown price', () => {
    const product = {
      price_incl_tax: -1,
      errors: {}
    } as any as CartItem

    expect(validateProduct(product)).toEqual(['Product price is unknown, product cannot be added to the cart!'])
  });

  it('returns product errors', () => {
    const product = {
      price_incl_tax: 5,
      errors: {
        error1: 'error 1',
        error2: 'error 2'
      }
    } as any as CartItem

    expect(validateProduct(product)).toEqual(['error 1', 'error 2'])
  });
});
