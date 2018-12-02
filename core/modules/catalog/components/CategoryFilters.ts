import { buildFilterProductsQuery } from '@vue-storefront/store/helpers'
import { mapGetters } from 'vuex';

export default {
  name: 'CategoryFilters',
  computed: {
    ...mapGetters('category', ['getActiveCategoryFilters', 'getCategorySearchOptions', 'getAllCategoryFilters']),
    filters () {
      return this.getAllCategoryFilters
    },
    activeFilters () {
      return this.getActiveCategoryFilters
    }
  },
  methods: {
    /** used to sort filters descending by id */
    sortById (filters) {
      return [...filters].sort((a, b) => { return a.id - b.id })
    },
    resetAllFilters () {
      // todo: get rid of this one
      this.$bus.$emit('filter-reset')
      this.$store.dispatch('category/resetFilters')
      this.$store.dispatch('category/searchProductQuery', buildFilterProductsQuery(this.category, this.activeFilters))
      this.$store.dispatch('category/products', this.getCategorySearchOptions)
    }
  }
}
