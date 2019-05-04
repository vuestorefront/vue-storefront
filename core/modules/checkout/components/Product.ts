export const Product = {
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
    onProductChanged (event) {
      if (event.item.sku === this.product.sku) {
        this.$forceUpdate()
      }
    }
  },
  beforeMount () {
    this.$bus.$on('cart-after-itemchanged', this.onProductChanged)
  },
  beforeDestroy () {
    this.$bus.$off('cart-after-itemchanged', this.onProductChanged)
  }
}
