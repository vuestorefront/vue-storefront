/**
 * Init product_option, needed to next configuration step
 */
export default function setDefaultProductOptions (product) {
  if (product.product_option) return
  product.product_option = {
    extension_attributes: {
      custom_options: [],
      configurable_item_options: [],
      bundle_options: []
    }
  }
}
