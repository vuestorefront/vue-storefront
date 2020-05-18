import { StockService } from '@vue-storefront/core/data-resolver';
import config from 'config'

/**
 * Get products skus and products children skus. Based on that search for stock objects and return them.
 */
export default async function getStockItems (products) {
  const skuArray = products.map(({ sku, configurable_children = [] }) => {
    const childSkus = configurable_children.map((c) => c.sku)
    return [sku, ...childSkus]
  }).reduce((acc, curr) => acc.concat(curr), [])
  if (!config.stock.synchronize) return
  try {
    const task = await StockService.list(skuArray)

    if (task.resultCode === 200) {
      return task.result
    }
    return []
  } catch (err) {
    console.error(err)
    return []
  }
}
