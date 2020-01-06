import toString from 'lodash-es/toString'

export default {
  props: {
    variant: {
      type: Object,
      default: () => ({})
    },
    selectedFilters: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isActive () {
      const selectedVariantFilter = this.selectedFilters[this.variant.type]
      if (!selectedVariantFilter) return false
      if (Array.isArray(selectedVariantFilter)) return !!selectedVariantFilter.find(variant => variant.id === this.variant.id)
      return toString(selectedVariantFilter.id) === toString(this.variant.id)
    }
  }
}
