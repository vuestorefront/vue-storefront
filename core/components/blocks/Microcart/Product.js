import Product from '@vue-storefront/core/modules/cart/components/Product.ts'

export default {
  data () {
    // depreciated
    return {
      qty: 0,
      isEditing: false
    }
  },
  beforeMount () {
    // deprecated, will be moved to theme or removed in the near future #1742
    this.$bus.$on('cart-after-itemchanged', this.onProductChanged)
  },
  beforeDestroy () {
    // deprecated, will be moved to theme or removed in the near future #1742
    this.$bus.$off('cart-after-itemchanged', this.onProductChanged)
  },
  methods: {
    updateQuantity () {
      // additional logic will be moved to theme
      this.qty = parseInt(this.qty)
      if (this.qty <= 0) {
        this.qty = this.product.qty
      }
      Product.methods.updateQuantity.call(this, this.qty)
      this.isEditing = !this.isEditing
    },
    onProductChanged (event) {
      // deprecated, will be moved to theme or removed in the near future #1742
      if (event.item.sku === this.product.sku) {
        this.$forceUpdate()
      }
    },
    switchEdit () {
      // will be moved to default theme in the near future
      this.isEditing ? this.updateQuantity() : this.qty = this.product.qty
      this.isEditing = !this.isEditing
    }
  },
  mixins: [
    Product
  ]
}
