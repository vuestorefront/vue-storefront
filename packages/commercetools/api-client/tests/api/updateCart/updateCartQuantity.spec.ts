import updateCartQuantity from './../../../src/api/updateCartQuantity';

const cart = {
  id: 1,
  version: 1
} as any;

describe('[commercetools-api-client] updateCartQuantity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates cart product quantity', async () => {
    const product = { id: 1,
      sku: '123',
      qty: 2 } as any;

    const response = await updateCartQuantity(cart, product);

    expect(response).toEqual({
      id: 1,
      version: 1,
      actions: [
        {
          changeLineItemQuantity: {
            lineItemId: 1,
            quantity: 2
          }
        }
      ]
    });
  });
});
