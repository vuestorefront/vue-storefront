/**
 * Add 'stock' object to 'configurable_children' and filter configurable child that is not available
 */
export default function filterChildrenByStockitem (product, stockItems = []) {
  for (const stockItem of stockItems) {
    const confChild = product.configurable_children.find((child) => child.id === stockItem.product_id)
    if (!stockItem.is_in_stock || (confChild && confChild.status >= 2/* conf child is disabled */)) {
      product.configurable_children = product.configurable_children.filter((child) => child.id !== stockItem.product_id)
    } else {
      if (confChild) {
        confChild.stock = stockItem
      }
    }
  }
}
