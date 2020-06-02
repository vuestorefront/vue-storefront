import config from 'config'
import {
  getMediaGallery,
  configurableChildrenImages,
  attributeImages
} from './'
import uniqBy from 'lodash-es/uniqBy'
import Product from '@vue-storefront/core/modules/catalog/types/Product';

export default function getProductGallery (product: Product) {
  if (product.type_id === 'configurable' && product.hasOwnProperty('configurable_children')) {
    if (!config.products.gallery.mergeConfigurableChildren && product.is_configured) {
      return attributeImages(product)
    }
  }

  const productGallery = uniqBy(configurableChildrenImages(product).concat(getMediaGallery(product)), 'src')
    .filter(f => f.src && f.src !== config.images.productPlaceholder)

  return productGallery
}
