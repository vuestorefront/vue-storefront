import Vue from 'vue'
import ProductTile from './ProductTile'

export default Vue.component('ProductListing', {
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    ProductTile
  }
})
