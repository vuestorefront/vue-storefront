import { getMe, createCart } from '@vue-storefront/commercetools-api';
import loadCurrentCart from '../../src/useCart/currentCart';

const cart = { id: 'cartid' };
const cartResponse = { data: { cart } };

jest.mock('@vue-storefront/commercetools-api', () => ({
  getMe: jest.fn(() => ({ data: { me: { activeCart: cart } } })),
  createCart: jest.fn(() => cartResponse)
}));

describe('[commercetools-composables] useCart/currentCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads current cart', async () => {

    const response = await loadCurrentCart();

    expect(response).toEqual(cart);
    expect(getMe).toBeCalled();
    expect(createCart).not.toBeCalled();
  });

  it('creates cart when could not be loaded', async () => {
    (getMe as any).mockReturnValue({ data: { me: { activeCart: null } } });

    const response = await loadCurrentCart();

    expect(response).toEqual(cart);
    expect(createCart).toBeCalled();
  });

  it('creates new cart when there is no id of the current one', async () => {
    const response = await loadCurrentCart();

    expect(createCart).toBeCalled();
    expect(response).toEqual(cart);
  });
});
