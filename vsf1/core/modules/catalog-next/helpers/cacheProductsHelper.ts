import { products } from 'config'

export const prefetchStockItems = (cachedProductsResponse, cache = {}) => {
  const skus = []
  let prefetchIndex = 0
  cachedProductsResponse.items.map(i => {
    if (products.configurableChildrenStockPrefetchStatic &&
        products.configurableChildrenStockPrefetchStaticPrefetchCount > 0) {
      if (prefetchIndex > products.configurableChildrenStockPrefetchStaticPrefetchCount) return
    }
    skus.push(i.sku) // main product sku to be checked anyway
    if (i.type_id === 'configurable' && i.configurable_children && i.configurable_children.length > 0) {
      for (const confChild of i.configurable_children) {
        const cachedItem = cache[confChild.id]
        if (typeof cachedItem === 'undefined' || cachedItem === null) {
          skus.push(confChild.sku)
        }
      }
      prefetchIndex++
    }
  })

  return skus
}
