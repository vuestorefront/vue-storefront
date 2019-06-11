import { CategorySort } from '@vue-storefront/core/modules/catalog/components/CategorySort'
import config from 'config'

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
      return config.products.sortByAttributes
    }
  },
  mixins: [CategorySort]
}
