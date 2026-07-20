import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import config from 'config'
import { getThumbnailPath, productThumbnailPath } from '@vue-storefront/core/helpers'

import getProductImagePlaceholder from './getProductImagePlaceholder'

const getThumbnailForProduct = (product: CartItem): string => {
  const thumbnail = productThumbnailPath(product)

  if (!thumbnail) {
    return getProductImagePlaceholder();
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return getThumbnailPath(thumbnail, config.products.thumbnails.width, config.products.thumbnails.height)
  }

  return getThumbnailPath(thumbnail, config.cart.thumbnails.width, config.cart.thumbnails.height)
}

export default getThumbnailForProduct
