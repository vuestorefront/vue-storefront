import { mapGetters } from 'vuex'
import toString from 'lodash-es/toString'

export default {
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters({ selectedFilters: 'category-next/getCurrentFilters' }),
    isActive () {
      return this.isActiveOption(this.option)
    }
  },
  methods: {
    isActiveOption (option) {
      const selectedVariantFilter = this.selectedFilters[option.type]
      if (!selectedVariantFilter) return false
      if (Array.isArray(selectedVariantFilter)) return !!selectedVariantFilter.find(o => o.id === option.id)
      return toString(selectedVariantFilter.id) === toString(option.id)
    }
  }
}
