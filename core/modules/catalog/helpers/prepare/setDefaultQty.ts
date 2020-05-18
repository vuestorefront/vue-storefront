/**
 * set product quantity to 1
 */
export default function setDefaultQty (product) {
  if (!product.qty) {
    product.qty = 1
  }
}
