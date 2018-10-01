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
    // depreciated, will be partially moved to theme in the near future
    this.$bus.$on('cart-after-itemchanged', this.onProductChanged)
  },
  beforeDestroy () {
    // depreciated, will be partially moved to theme in the near future
    this.$bus.$off('cart-after-itemchanged', this.onProductChanged)
  },
  methods: {
    updateQuantity () {
      // Method cleared from additional stuff, now it's only dispatching an action
      this.qty = parseInt(this.qty)
      if (this.qty <= 0) {
        this.qty = this.product.qty
      }
      Product.methods.updateQuantity.call(this, this.product, this.qty)
      this.isEditing = !this.isEditing
    },
    onProductChanged (event) {
      // depreciated
      if (event.item.sku === this.product.sku) {
        this.$forceUpdate()
      }
    },
    switchEdit () {
      // depreciated, will be partially moved to theme in the near future
      this.isEditing ? this.updateQuantity() : this.qty = this.product.qty
      this.isEditing = !this.isEditing
    }
  },
  mixins: [
    Product
  ]
}
