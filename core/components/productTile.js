import Vue from 'vue'
import { productThumbnailPath } from '@vue-storefront/store/helpers'
import imgPlaceholder from 'core/directives/imgPlaceholder'

export default Vue.component('ProductTile', {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      clicks: 0,
      placeholder: '/assets/placeholder.jpg'
    }
  },
  computed: {
    thumbnail () {
      // todo: play with the image based on category page filters - eg. when 'red' color is chosen, image is going to be 'red'
      let thumbnail = productThumbnailPath(this.product)
      return this.getThumbnail(thumbnail, 310, 300)
    },
    isOnSale() {
      return this.product.sale === '1' ? 'sale' : ''
    },
    isNew() {
      return this.product.new === '1' ? 'new' : ''
    }
  },
  directives: { imgPlaceholder }
})
