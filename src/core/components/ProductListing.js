export default {
  name: 'ProductListing',
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [String, Number],
      required: true
    }
  }
}
