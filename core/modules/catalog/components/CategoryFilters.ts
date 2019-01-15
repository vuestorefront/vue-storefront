import { buildFilterProductsQuery } from '@vue-storefront/store/helpers'

export default {
  name: 'CategoryFilters',
  computed: {
    filters () {
      return this.$store.state.category.filters
    },
    activeFilters () {
      return this.$store.state.category.filters.chosen
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
      this.$store.dispatch('category/products', this.$store.state.category.current_product_query)
    }
  }
}
