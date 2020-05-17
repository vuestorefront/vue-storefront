import { preConfigureProduct } from '../prepare';

/**
 * Set associated product to product link object
 */
export default async function setProductLink (productLink, associatedProduct) {
  if (associatedProduct) {
    productLink.product = preConfigureProduct(associatedProduct)
    productLink.product.qty = productLink.qty || 1
  } else {
    console.error('Product not found', productLink.linked_product_sku || productLink.sku)
  }
}
