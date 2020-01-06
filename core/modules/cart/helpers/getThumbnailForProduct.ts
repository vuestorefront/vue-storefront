import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import config from 'config'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { productThumbnailPath } from '@vue-storefront/core/helpers'

const getThumbnailForProduct = (product: CartItem): string => {
  const thumbnail = productThumbnailPath(product)

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return getThumbnailPath(thumbnail, config.products.thumbnails.width, config.products.thumbnails.height)
  }

  return getThumbnailPath(thumbnail, config.cart.thumbnails.width, config.cart.thumbnails.height)
}

export default getThumbnailForProduct
