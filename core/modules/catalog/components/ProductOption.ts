import { isOptionAvailableAsync } from '@vue-storefront/core/modules/catalog/helpers/index'
import { getAvailableFiltersByProduct, getSelectedFiltersByProduct } from '@vue-storefront/core/modules/catalog/helpers/filters'

export const ProductOption = {
  computed: {
    getAvailableFilters () {
      return getAvailableFiltersByProduct(this.product)
    },
    getSelectedFilters () {
      return getSelectedFiltersByProduct(this.product, this.configuration)
    }
  },
  methods: {
    isOptionAvailable (option) { // check if the option is available
      let currentConfig = Object.assign({}, this.configuration)
      currentConfig[option.type] = option
      return isOptionAvailableAsync(this.$store, { product: this.product, configuration: currentConfig })
    }
  }
}
