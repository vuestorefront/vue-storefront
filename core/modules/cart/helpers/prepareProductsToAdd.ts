import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import productChecksum from './productChecksum'

const prepareProductsToAdd = (product: CartItem): CartItem[] => {
  if (product.type_id === 'grouped') {
    return product.product_links
      .filter(p => p.link_type === 'associated')
      .map(p => p.product)
  }

  if (product.type_id === 'bundle') {
    product.checksum = productChecksum(product)
  }

  return [product]
}

export default prepareProductsToAdd
