import i18n from '@vue-storefront/i18n'
import { mapGetters } from 'vuex'
import { Compare } from '@vue-storefront/core/modules/compare/components/Compare.ts'

export default {
  name: 'Compare',
  mixins: [Compare],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      attributesByCode: 'attribute/attributeListByCode'
    }),
    all_comparable_attributes () {
      return Object
        .values(this.attributesByCode)
        .filter(a => parseInt(a.is_comparable))
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title || i18n.t('Compare Products'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  }
}
