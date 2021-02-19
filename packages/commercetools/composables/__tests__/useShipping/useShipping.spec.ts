import useShipping from '../../src/useShipping';
import useCart from '../../src/useCart';

jest.mock('@vue-storefront/commercetools-api', () => ({
  cartActions: {
    setShippingMethodAction: () => {},
    setShippingAddressAction: () => {}
  }
}));

jest.mock('../../src/useCart', () => jest.fn(() => {}));

jest.mock('@vue-storefront/core', () => ({
  useShippingFactory: (params) => () => params
}));

describe('[commercetools-composables] useShipping', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides cart', async () => {
    const { provide } = useShipping() as any;
    const mockedCart = '12312312';
    (useCart as jest.Mock).mockImplementation(() => mockedCart);

    const toProvide = provide();

    expect(toProvide).toMatchObject({ cart: mockedCart });
    expect(useCart).toHaveBeenCalled();
  });

  it('loads shipping address via request if cart is not present', async () => {
    const { load } = useShipping() as any;
    const loadedShippingAddress = 'loadedShippingAddress';
    const context = {
      cart: {
        cart: {
          value: {
            shippingAddress: null
          }
        },
        load: jest.fn(() => {
          context.cart.cart.value.shippingAddress = loadedShippingAddress;
        })
      }
    };

    const response = await load(context, {});

    expect(response).toBe(loadedShippingAddress);
    expect(context.cart.load).toHaveBeenCalled();
  });

  it('loads shipping address from cart if cart is present', async () => {
    const { load } = useShipping() as any;
    const loadedShippingAddress = 'loadedShippingAddress';
    const context = {
      cart: {
        cart: {
          value: {
            shippingAddress: loadedShippingAddress
          }
        },
        load: jest.fn()
      }
    };

    const response = await load(context, {});

    expect(response).toBe(loadedShippingAddress);
    expect(context.cart.load).not.toHaveBeenCalled();
  });

  it('saves shipping details, updates cart and returns shipping details', async () => {
    const { save } = useShipping() as any;
    const newShippingAddress = 'newShippingAddress';
    const context = {
      cart: {
        cart: {
          value: {
            shippingAddress: null
          }
        },
        setCart: jest.fn(address => {
          context.cart.cart.value.shippingAddress = address;
        })
      },
      $ct: {
        api: {
          updateCart: jest.fn(() => ({
            data: {
              cart: newShippingAddress
            }
          }))
        }
      }
    };

    const response = await save(context, { shippingDetails: newShippingAddress });

    expect(response).toBe(newShippingAddress);
    expect(context.cart.setCart).toHaveBeenCalledWith(newShippingAddress);
  });
});

