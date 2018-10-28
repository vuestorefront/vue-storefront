import Product from '@vue-storefront/store/types/product/Product'

export const RemoveFromCompare = {
  name: 'RemoveFromCompare',
  methods: {
    removeFromCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/removeItem', product)
        : false
    }
  }
}
