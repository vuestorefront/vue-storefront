import setDefaultQty from './setDefaultQty';
import setDefaultObjects from './setDefaultObjects';
import setParentSku from './setParentSku';
import setParentId from './setParentId';
import setCustomAttributesForChild from './setCustomAttributesForChild';
import setDefaultProductOptions from './setDefaultProductOptions';

/**
 * Apply base modification to product, after those modification we can store product in cache.
 */
function preConfigureProduct (product) {
  // base product modifications
  setDefaultQty(product)
  setDefaultObjects(product)
  setParentSku(product)
  setParentId(product)
  setCustomAttributesForChild(product)
  setDefaultProductOptions(product)

  return product;
}

/**
 * Apply base modification to product list, after those modification we can store product in cache.
 */
function prepareProducts (products) {
  const preparedProducts = products.map(preConfigureProduct)

  return preparedProducts
}

export {
  prepareProducts,
  preConfigureProduct
}
