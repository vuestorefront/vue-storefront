import Vue from 'vue'
import { productThumbnailPath } from '@vue-storefront/store/helpers'

export default Vue.component('ProductTile', {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    thumbnail () {
      // todo: play with the image based on category page filters - eg. when 'red' color is chosen, image is going to be 'red'
      let thumbnail = productThumbnailPath(this.product)
      return this.getThumbnail(thumbnail, 310, 300)
    }
  }
})
