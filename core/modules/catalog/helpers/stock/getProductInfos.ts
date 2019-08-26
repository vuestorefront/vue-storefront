const getProductInfos = (products) => products.map(product => ({
  is_in_stock: product.is_in_stock,
  qty: product.qty,
  product_id: product.product_id
}))

export default getProductInfos
