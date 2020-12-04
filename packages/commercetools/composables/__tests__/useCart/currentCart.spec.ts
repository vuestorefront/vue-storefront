import loadCurrentCart from '../../src/useCart/currentCart';

const cart = { id: 'cartid' };
const cartResponse = { data: { cart } };

const context = {
  $ct: {
    api: {
      getMe: jest.fn(() => ({ data: { me: { activeCart: cart } } })),
      createCart: jest.fn(() => cartResponse)
    }
  }
};

describe('[commercetools-composables] useCart/currentCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads current cart', async () => {

    const response = await loadCurrentCart(context);

    expect(response).toEqual(cart);
    expect(context.$ct.api.getMe).toBeCalled();
    expect(context.$ct.api.createCart).not.toBeCalled();
  });

  it('creates cart when could not be loaded', async () => {
    (context.$ct.api.getMe as any).mockReturnValue({ data: { me: { activeCart: null } } });

    const response = await loadCurrentCart(context);

    expect(response).toEqual(cart);
    expect(context.$ct.api.createCart).toBeCalled();
  });

  it('creates new cart when there is no id of the current one', async () => {
    const response = await loadCurrentCart(context);

    expect(context.$ct.api.createCart).toBeCalled();
    expect(response).toEqual(cart);
  });
});
