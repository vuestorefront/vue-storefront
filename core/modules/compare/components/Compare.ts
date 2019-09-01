import { mapGetters } from 'vuex'
import Product from '@vue-storefront/core/modules/catalog/types/Product'
import compareMountedMixin from '@vue-storefront/core/modules/compare/mixins/compareMountedMixin'

export const Compare = {
  name: 'Compare',
  mixins: [compareMountedMixin],
  computed: {
    ...mapGetters({
      items: 'compare/getCompareItems',
      allComparableAttributes: 'attribute/getAllComparableAttributes'
    })
  },
  created () {
    this.$store.dispatch('attribute/list', {
      filterValues: [],
      filterField: 'is_user_defined'
    })
  },
  methods: {
    removeFromCompare (product: Product) {
      return this.$store.state['compare']
        ? this.$store.dispatch('compare/removeItem', product)
        : false
    }
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      if (context) context.output.cacheTags.add(`compare`)
      resolve()
    })
  }
}
