import getProduct from './../../src/api/getProduct';

describe('test getProduct', () => {
  it('fetches product', async () => {
    const {
      data: { product },
    } = await getProduct();
    expect(product).toEqual({
      id: 'test id',
      key: 'example key',
      version: 2,
      __typename: 'Product',
    });
  });
});
