import i18n from '@vue-storefront/i18n'
import Product from '@vue-storefront/store/types/product/Product'

export const Compare = {
  name: 'Compare',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title || i18n.t('Compare Products'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  },
  computed: {
    items () : Product[] {
      return this.$store.state.compare.items
    },
    allComparableAttributes () {
      const attributesByCode = this.$store.getters['attribute/attributeListByCode']
      return Object.values(attributesByCode).filter((a: any) => parseInt(a.is_comparable))
    }
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
