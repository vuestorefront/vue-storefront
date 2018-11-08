import { buildFilterProductsQuery } from '@vue-storefront/store/helpers'

export default {
  name: 'CategorySidebar',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  computed: {
    category () {
      return this.$store.state.category.current
    },
    activeFilters () {
      return this.$store.state.category.filters.chosen
    }
  },
  methods: {
    sortById (filters) {
      return [...filters].sort((a, b) => { return a.id - b.id })
    },
    resetAllFilters () {
      this.$bus.$emit('filter-reset')
      this.$store.dispatch('category/resetFilters')
      const filterQr = buildFilterProductsQuery(this.category, this.activeFilters)
      this.$store.state.category.current_product_query = Object.assign(this.$store.state.category.current_product_query, {
        searchProductQuery: filterQr
      })
      this.$store.dispatch('category/products', this.$store.state.category.current_product_query)
    }
  }
}
