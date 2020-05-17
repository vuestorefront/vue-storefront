import filterChildrenByStockitem from './filterChildrenByStockitem'
import { hasConfigurableChildren } from './..';

export default function filterOutUnavailableVariants (product, stockItems = []) {
  const productStockItem = stockItems.find(p => p.product_id === product.id)
  product.stock = productStockItem
  if (productStockItem && !productStockItem.is_in_stock) {
    product.errors.variants = 'No available product variants'
  }

  if (product.type_id === 'configurable' && hasConfigurableChildren(product)) {
    filterChildrenByStockitem(stockItems, product)
  }
}
