import filterChildrenByStockitem from './filterChildrenByStockitem'
import { hasConfigurableChildren } from './..';

/**
 * Add 'stock' object to product. If product is out of stock then add error to product.
 * Also check all children for configurable products and remove if any children is out of stock.
 */
export default function filterOutUnavailableVariants (product, stockItems = []) {
  const productStockItem = stockItems.find(p => p.product_id === product.id)
  product.stock = productStockItem
  if (productStockItem && !productStockItem.is_in_stock) {
    product.errors.variants = 'No available product variants'
  }

  if (product.type_id === 'configurable' && hasConfigurableChildren(product)) {
    filterChildrenByStockitem(product, stockItems)
  }
}
