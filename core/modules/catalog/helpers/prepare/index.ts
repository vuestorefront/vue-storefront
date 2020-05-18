import setDefaultQty from './setDefaultQty';
import setDefaultObjects from './setDefaultObjects';
import setParentSku from './setParentSku';
import setCustomAttributesForChild from './setCustomAttributesForChild';
import setDefaultProductOptions from './setDefaultProductOptions';

/**
 * Take products and apply base modification to it
 */
function preConfigureProduct (product) {
  // base product modifications
  setDefaultQty(product)
  setDefaultObjects(product)
  setParentSku(product)
  setCustomAttributesForChild(product)
  setDefaultProductOptions(product)

  return product;
}

/**
 * Apply base configuration to product list
 */
function prepareProducts (products) {
  const preparedProducts = products.map(preConfigureProduct)

  return preparedProducts
}

export {
  prepareProducts,
  preConfigureProduct
}
