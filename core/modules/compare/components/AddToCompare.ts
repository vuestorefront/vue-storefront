import Product from '@vue-storefront/core/modules/catalog/types/Product'

export const AddToCompare = {
  name: 'AddToCompare',
  methods: {
    addToCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/addItem', product)
        : false
    }
  }
}
