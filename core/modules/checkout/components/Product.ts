import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
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
    EventBus.$on('cart-after-itemchanged', this.onProductChanged)
  },
  beforeDestroy () {
    EventBus.$off('cart-after-itemchanged', this.onProductChanged)
  }
}
