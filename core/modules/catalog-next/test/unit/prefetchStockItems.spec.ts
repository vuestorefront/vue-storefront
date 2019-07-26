import { prefetchStockItems } from '../../helpers/cacheProductsHelper';

describe('prefetchStockItems method', () => {
  it('returns an empty array when no items are provided', () => {
    const cachedProductsResponse = {
      items: []
    }
    const result = prefetchStockItems(cachedProductsResponse)
    expect(result).toEqual([]);
  })
})
