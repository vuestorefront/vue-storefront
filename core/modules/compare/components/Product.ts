import Product from '@vue-storefront/core/modules/catalog/types/Product'
import compareMountedMixin from '@vue-storefront/core/modules/compare/mixins/compareMountedMixin'

export const CompareProduct = {
  name: 'CompareProduct',
  mixins: [compareMountedMixin],
  computed: {
    isToCompare (): boolean {
      return this.$store.getters['compare/isToCompare'](this.product)
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
