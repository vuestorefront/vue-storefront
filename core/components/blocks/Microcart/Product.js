import Product from '@vue-storefront/core/modules/cart/components/Product.ts'

export default {
  methods: {
    data () {
      return {
        qty: 0,
        isEditing: false
      }
    },
    updateQuantity () {
      this.qty = parseInt(this.qty)
      if (this.qty <= 0) {
        this.qty = this.product.qty
      }
      Product.methods.updateQuantity.call(this, this.product, this.qty)
      this.isEditing = !this.isEditing
    }
  },
  mixins: [
    Product
  ]
}
