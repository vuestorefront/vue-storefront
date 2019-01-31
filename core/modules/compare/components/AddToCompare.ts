import Product from '@vue-storefront/core/modules/catalog/types/Product'
import moduleComponentMounted from '@vue-storefront/core/modules/compare/mixins/moduleComponentMounted'

export const AddToCompare = {
  name: 'AddToCompare',
  mixins: [moduleComponentMounted],
  methods: {
    addToCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/addItem', product)
        : false
    }
  }
}
