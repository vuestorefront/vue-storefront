import { CategorySort } from '@vue-storefront/core/modules/catalog/components/CategorySort'

export default {
  name: 'SortBy',
  methods: {
    changeOrder () {
      // renamed to sort
      this.sort()
    }
  },
  computed: {
    sortByAttribute () {
      // renamed to sortingOptions
      return this.$store.state.config.products.sortByAttributes
    }
  },
  mixins: [CategorySort]
}
