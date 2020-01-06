import { CompareModule } from '..'
import compareMountedMixin from '@vue-storefront/core/modules/compare/mixins/compareMountedMixin'
import { registerModule } from '@vue-storefront/core/lib/modules';

export const IsOnCompare = {
  name: 'IsOnCompare',
  mixins: [compareMountedMixin],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  created () {
    registerModule(CompareModule)
  },
  computed: {
    isOnCompare () {
      return this.$store.getters['compare/isOnCompare'](this.product)
    }
  }
}
