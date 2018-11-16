import Product from '@vue-storefront/core/modules/catalog/types/Product'

export const CompareProduct = {
  name: 'CompareProduct',
  computed: {
    isOnCompare () : boolean {
      return this.$store.getters['compare/isOnCompare'](this.product)
    }
  },
  methods: {
    removeFromCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/removeItem', product)
        : false
    }
  }
}
