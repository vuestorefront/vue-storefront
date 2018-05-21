import ProductTile from './ProductTile'

export default {
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
}
