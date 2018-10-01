import Product from '@vue-storefront/core/modules/cart/components/Product.ts'

export default {
  data () {
    return {
      qty: 0,
      isEditing: false
    }
  },
  beforeMount () {
    this.$bus.$on('cart-after-itemchanged', this.onProductChanged)
  },
  beforeDestroy () {
    this.$bus.$off('cart-after-itemchanged', this.onProductChanged)
  },
  methods: {
    updateQuantity () {
      this.qty = parseInt(this.qty)
      if (this.qty <= 0) {
        this.qty = this.product.qty
      }
      Product.methods.updateQuantity.call(this, this.product, this.qty)
      this.isEditing = !this.isEditing
    },
    onProductChanged (event) {
      if (event.item.sku === this.product.sku) {
        this.$forceUpdate()
      }
    }
  },
  mixins: [
    Product
  ]
}
