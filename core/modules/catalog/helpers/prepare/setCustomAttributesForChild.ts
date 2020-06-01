import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { hasConfigurableChildren } from '../';
/**
 * Fill custom attributes for every configurable child
 */
export default function setCustomAttributesForChild (product: Product) {
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
