import { mapState, mapGetters } from 'vuex'
import i18n from '@vue-storefront/core/lib/i18n'
import Composite from '@vue-storefront/core/mixins/composite'

export default {
  name: 'Compare',
  mixins: [Composite],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      attributesByCode: 'attribute/attributeListByCode',
      attributesById: 'attribute/attributeListById'
    }),
    ...mapState('compare', [
      'items'
    ]),
    all_comparable_attributes () {
      return Object.values(this.attributesByCode).filter(a => {
        return parseInt(a.is_comparable)
      })
    }
  },
  created () {
    this.$store.dispatch('attribute/list', {
      filterValues: [true],
      filterField: 'is_user_defined'
    })
  },
  methods: {
    removeFromCompare (product) {
      this.$store.dispatch('compare/removeItem', product)
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title || i18n.t('Compare Products'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  }
}
