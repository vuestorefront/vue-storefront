import { hasConfigurableChildren } from '../';

/**
 * set product quantity to 1
 */
function setDefaultQty (product) {
  if (!product.qty) {
    product.qty = 1
  }
}

/**
 * set parent sku, this is needed, because in configuration process we will override sku by configurable_children.sku
 */
function setParentSku (product) {
  if (!product.parentSku) {
    product.parentSku = product.sku
  }
}

/**
 * Default object that are used in vsf
 */
function setDefaultObjects (product) {
  product.errors = {}; // this is an object to store validation result for custom options and others
  product.info = {};
}

/**
 * Fill custom attributes for every configurable child
 */
function setCustomAttributesForChild (product) {
  if (!hasConfigurableChildren(product)) return
  // handle custom_attributes for easier comparing in the future
  product.configurable_children.forEach((child) => {
    let customAttributesAsObject = {}
    if (child.custom_attributes) {
      child.custom_attributes.forEach((attr) => {
        customAttributesAsObject[attr.attribute_code] = attr.value
      })
      // add values from custom_attributes in a different form
      Object.assign(child, customAttributesAsObject)
    }
  })
}

/**
 * Init product_option, needed to next configuration step
 */
function setDefaultProductOptions (product) {
  if (product.product_option) return
  product.product_option = {
    extension_attributes: {
      custom_options: [],
      configurable_item_options: [],
      bundle_options: []
    }
  }
}

/**
 * Take products and apply base modification to it
 */
export function preConfigureProduct (product) {
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

export default prepareProducts
