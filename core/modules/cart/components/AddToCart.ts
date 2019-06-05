import Product from '@vue-storefront/core/modules/catalog/types/Product'

export const AddToCart = {
  name: 'AddToCart',
  props: {
    product: {
      required: true,
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async addToCart (product: Product) {
      this.disabled = true
      await this.$store.dispatch('cart/addItem', { productToAdd: product })
      this.disabled = false
    }
  }
}
