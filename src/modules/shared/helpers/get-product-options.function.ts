import Product, { ProductOptions } from 'core/modules/catalog/types/Product';

export function getProductOptions (product: Product): ProductOptions {
  const productExtensionAttributes = product.product_option?.extension_attributes;

  return {
    extension_attributes: {
      bundle_options: productExtensionAttributes?.bundle_options || [],
      configurable_item_options: productExtensionAttributes?.configurable_item_options || [],
      custom_options: productExtensionAttributes?.custom_options || [],
      am_giftcard_options: productExtensionAttributes?.am_giftcard_options
    }
  }
}
