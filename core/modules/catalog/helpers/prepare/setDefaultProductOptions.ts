import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { AmGiftCardOptions } from 'src/modules/gift-card';

/**
 * Init product_option, needed to next configuration step
 */
export default function setDefaultProductOptions (product: Product) {
  if (product.product_option) return
  product.product_option = {
    extension_attributes: {
      custom_options: [],
      configurable_item_options: [],
      bundle_options: [],
      am_giftcard_options: undefined
    }
  }
}
