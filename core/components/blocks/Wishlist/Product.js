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
  },
  methods: {
    removeItem () {
      this.$store.dispatch('wishlist/removeItem', this.product)
      this.$bus.$emit('product-after-remove-from-wishlist', this.product)
    }
  }
}
