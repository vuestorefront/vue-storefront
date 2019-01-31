import Product from '@vue-storefront/core/modules/catalog/types/Product'
import moduleComponentMounted from '@vue-storefront/core/modules/compare/mixins/moduleComponentMounted'

export const CompareProduct = {
  name: 'CompareProduct',
  mixins: [moduleComponentMounted],
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
