import { buildFilterProductsQuery } from '@vue-storefront/store/helpers'
import { mapGetters } from 'vuex'

export default {
  name: 'CategorySidebar',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('category', ['getCurrentCategory', 'getCategoryActiveFilters', 'getCategorySearchOptions']),
    category () {
      return this.getCurrentCategory
    },
    activeFilters () {
      return this.getCategoryActiveFilters
    }
  },
  methods: {
    sortById (filters) {
      return [...filters].sort((a, b) => { return a.id - b.id })
    },
    resetAllFilters () {
      this.$bus.$emit('filter-reset')
      this.$store.dispatch('category/resetFilters')
      this.$store.dispatch('category/searchProductQuery', buildFilterProductsQuery(this.category, this.activeFilters))
      this.$store.dispatch('category/products', this.getCategorySearchOptions)
    }
  }
}
