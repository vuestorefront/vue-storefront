import Product from '@vue-storefront/store/types/product/Product'

export const Product = {
  name: 'Product',
  computed: {
    isOnCompare () {
      return !!this.$store.state.compare.items.find(p => p.sku === this.product.sku)
    }
  },
  methods: {
    addToCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/addItem', product)
        : false
    },
    removeFromCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/removeItem', product)
        : false
    }
  }
}
