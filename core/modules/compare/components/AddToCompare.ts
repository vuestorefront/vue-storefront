import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { CompareModule } from '../'
import compareMountedMixin from '@vue-storefront/core/modules/compare/mixins/compareMountedMixin'
import { registerModule } from '@vue-storefront/core/lib/modules';

export const AddToCompare = {
  name: 'AddToCompare',
  mixins: [compareMountedMixin],
  created () {
    registerModule(CompareModule)
  },
  methods: {
    addToCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/addItem', product)
        : false
    }
  }
}
