import { getStorage, getCart, createCart } from '@vue-storefront/commercetools-api'
import loadCurrentCart from '../../src/useCart/currentCart'

const cart = { id: 'cartid' }
const cartResponse = { data: { cart } }

const storageMock = {
  setItem: jest.fn(),
  getItem: jest.fn()
}

jest.mock('@vue-storefront/commercetools-api', () => ({
  getStorage: () => storageMock,
  getCart: jest.fn(() => cartResponse),
  createCart: jest.fn(() => cartResponse),
}))

jest.mock('./../../src/helpers/internals', () => ({
  enhanceCart: args => args
}))

describe('[commercetools-composables] useCart/currentCart', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('loads current cart', async () => {
    (getStorage().getItem as any).mockReturnValue('cartid');

    const response = await loadCurrentCart()

    expect(response).toEqual(cart)
    expect(getCart).toBeCalled()
    expect(createCart).not.toBeCalled()
  })

  it('creates cart when could not be loaded', async () => {
    (getStorage().getItem as any).mockReturnValue('cartid');
    (getCart as any).mockReturnValue({ data: { cart: null } });

    const response = await loadCurrentCart()

    expect(response).toEqual(cart)
    expect(getCart).toBeCalled()
    expect(createCart).toBeCalled()
  })

  it('creates new cart when there is no id of the current one', async () => {
    (getStorage().getItem as any).mockReturnValue(null);
    const response = await loadCurrentCart()

    expect(getCart).not.toBeCalled()
    expect(createCart).toBeCalled()
    expect(response).toEqual(cart)
  })
});
