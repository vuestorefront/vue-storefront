import { productThumbnailPath } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import config from 'config'

export const ProductTile = {
  name: 'ProductTile',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      clicks: 0,
      placeholder: '/assets/placeholder.jpg'
    }
  },
  computed: {
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    thumbnail () {
      // todo: play with the image based on category page filters - eg. when 'red' color is chosen, the image is going to be 'red'
      let thumbnail = productThumbnailPath(this.product)
      return this.getThumbnail(thumbnail, config.products.thumbnails.width, config.products.thumbnails.height)
    },
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.placeholder,
        error: this.placeholder
      }
    },
    isOnSale () {
      return [true, '1'].includes(this.product.sale) ? 'sale' : ''
    },
    isNew () {
      return [true, '1'].includes(this.product.new) ? 'new' : ''
    }
  }
}
