import Product from '@vue-storefront/store/types/product/Product'
import { mapState, mapGetters } from 'vuex'

export const Compare = {
  name: 'Compare',
  computed: {
    ...mapState('compare', [
      'items'
    ])
  },
  created () {
    this.$store.dispatch('compare/load')
    this.$store.dispatch('attribute/list', {
      filterValues: [true],
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
