import useBilling from '../../src/useBilling';
import useCart from '../../src/useCart';

jest.mock('@vue-storefront/commercetools-api', () => ({
  cartActions: {
    setBillingAddressAction: () => {}
  }
}));

jest.mock('../../src/useCart', () => jest.fn(() => {}));

jest.mock('@vue-storefront/core', () => ({
  useBillingFactory: (params) => () => params
}));

describe('[commercetools-composables] useBilling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides cart', async () => {
    const { provide } = useBilling() as any;
    const mockedCart = '12312312';
    (useCart as jest.Mock).mockImplementation(() => mockedCart);

    const toProvide = provide();

    expect(toProvide).toMatchObject({ cart: mockedCart });
    expect(useCart).toHaveBeenCalled();
  });

  it('loads billing address via request if cart is not present', async () => {
    const { load } = useBilling() as any;
    const loadedBillingAddress = 'loadedBillingAddress';
    const context = {
      cart: {
        cart: {
          value: {
            billingAddress: null
          }
        },
        load: jest.fn(() => {
          context.cart.cart.value.billingAddress = loadedBillingAddress;
        })
      }
    };

    const response = await load(context, {});

    expect(response).toBe(loadedBillingAddress);
    expect(context.cart.load).toHaveBeenCalled();
  });

  it('loads billing address from cart if cart is present', async () => {
    const { load } = useBilling() as any;
    const loadedBillingAddress = 'loadedBillingAddress';
    const context = {
      cart: {
        cart: {
          value: {
            billingAddress: loadedBillingAddress
          }
        },
        load: jest.fn()
      }
    };

    const response = await load(context, {});

    expect(response).toBe(loadedBillingAddress);
    expect(context.cart.load).not.toHaveBeenCalled();
  });

  it('saves billing details, updates cart and returns billing details', async () => {
    const { save } = useBilling() as any;
    const newBillingAddress = 'newBillingAddress';
    const context = {
      cart: {
        cart: {
          value: {
            billingAddress: null
          }
        },
        setCart: jest.fn(address => {
          context.cart.cart.value.billingAddress = address;
        })
      },
      $ct: {
        api: {
          updateCart: jest.fn(() => ({
            data: {
              cart: newBillingAddress
            }
          }))
        }
      }
    };

    const response = await save(context, { billingAddress: newBillingAddress });

    expect(response).toBe(newBillingAddress);
    expect(context.cart.setCart).toHaveBeenCalledWith(newBillingAddress);
  });
});
