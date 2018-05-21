
export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    thumbnail () {
      return this.getThumbnail(this.product.image, 150, 150)
    }
  }
}
