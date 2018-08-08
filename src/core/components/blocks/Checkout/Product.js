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
  created () {
    this.$bus.$on('cart-after-itemchanged', (event) => {
      if (event.item.sku === this.product.sku) {
        this.$forceUpdate()
      }
    })
  }
}
