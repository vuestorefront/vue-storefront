import { Compare as CompareModule } from '..'
import compareMountedMixin from '@vue-storefront/core/modules/compare/mixins/compareMountedMixin'

export const IsOnCompare = {
  name: 'IsOnCompare',
  mixins: [compareMountedMixin],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  created() {
    CompareModule.register()
  },
  computed: {
    isOnCompare(): boolean {
      return (
        !!this.$store.state.compare.items.find(
          p => p.sku === this.product.sku
        ) || false
      )
    }
  }
}
