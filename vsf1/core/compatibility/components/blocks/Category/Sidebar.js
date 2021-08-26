import { buildFilterProductsQuery } from '@vue-storefront/core/helpers'
import { mapGetters } from 'vuex'
import pickBy from 'lodash-es/pickBy'

export default {
  name: 'CategorySidebar',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('category', ['getCurrentCategory', 'getActiveCategoryFilters', 'getCurrentCategoryProductQuery']),
    category () {
      return this.getCurrentCategory
    },
    activeFilters () {
      return this.getActiveCategoryFilters
    },
    availableFilters () {
      return pickBy(this.filters, (filter, filterType) => { return (filter.length && !this.$store.getters['category-next/getSystemFilterNames'].includes(filterType)) })
    },
    hasActiveFilters () {
      return Object.keys(this.activeFilters).length !== 0
    }
  },
  mounted () {
    this.resetAllFilters()
  },
  methods: {
    sortById (filters) {
      return [...filters].sort((a, b) => { return a.id - b.id })
    },
    resetAllFilters () {
      if (this.hasActiveFilters) {
        this.$bus.$emit('filter-reset')
        this.$store.dispatch('category/resetFilters')
        this.$store.dispatch('category/searchProductQuery', {})
        this.$store.dispatch('category/mergeSearchOptions', {
          searchProductQuery: buildFilterProductsQuery(this.category, this.activeFilters)
        })
        this.$store.dispatch('category/products', this.getCurrentCategoryProductQuery)
      }
    }
  }
}
