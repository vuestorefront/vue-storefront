import { prefetchStockItems } from '../../helpers/cacheProductsHelper';
import config from 'config';

describe('prefetchStockItems method', () => {
  describe('default configurableChildrenStockPrefetchStaticPrefetchCount', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.mock('config', () => ({}));
    })

    it('returns an empty array when no items are provided', () => {
      const cachedProductsResponse = {
        items: []
      }
      const result = prefetchStockItems(cachedProductsResponse)
      expect(result).toEqual([]);
    })

    it('returns the skus of the children of a configurable', () => {
      const cachedProductsResponse = {
        items: [
          { sku: 'foo' },
          {
            sku: 'bar',
            type_id: 'configurable',
            configurable_children: [
              { sku: 'bar.foo' },
              { sku: 'bar.bar' },
              { sku: 'bar.baz' }
            ]
          },
          { sku: 'baz' }
        ]
      }
      const result = prefetchStockItems(cachedProductsResponse)
      expect(result).toEqual(['foo', 'bar', 'bar.foo', 'bar.bar', 'bar.baz', 'baz']);
    })

    it('returns the same skus of the provided simple products', () => {
      const cachedProductsResponse = {
        items: [
          { sku: 'foo' },
          { sku: 'bar' },
          { sku: 'baz' }
        ]
      }
      const result = prefetchStockItems(cachedProductsResponse)
      expect(result).toEqual(['foo', 'bar', 'baz']);
    })

    it('ignores the pre-cached skus of children of a configurable', () => {
      const cachedProductsResponse = {
        items: [
          { sku: 'foo' },
          {
            sku: 'bar',
            type_id: 'configurable',
            configurable_children: [
              { sku: 'bar.foo', id: 1337 },
              { sku: 'bar.bar' },
              { sku: 'bar.baz', id: 4711 }
            ]
          },
          { sku: 'baz' }
        ]
      }
      const result = prefetchStockItems(cachedProductsResponse, { 1337: {}, 4711: {} })
      expect(result).toEqual(['foo', 'bar', 'bar.bar', 'baz']);
    })
  })
})
