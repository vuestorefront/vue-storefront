import getProduct from './../../src/api/getProduct'

describe('test getProduct', () => {
  it('fetches product', async () => {
    const { data: { product } } = await getProduct()
    expect(product).toEqual({ id: 'Hello World', key: 'Hello World', __typename: 'Product' })
  })
})
