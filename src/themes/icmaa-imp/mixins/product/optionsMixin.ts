import i18n from '@vue-storefront/i18n'
import { mapGetters } from 'vuex'
import { LocaleMessages } from 'vue-i18n'
import { findConfigurableChildAsync } from '@vue-storefront/core/modules/catalog/helpers/index'

import cloneDeep from 'lodash-es/cloneDeep'

export default {
  computed: {
    ...mapGetters({
      getAttributeLabel: 'attribute/getAttributeLabel',
      getAttributeListByCode: 'attribute/getAttributeListByCode',
      getOptionLabel: 'attribute/getOptionLabel',
      configuration: 'product/getCurrentProductConfiguration'
    }),
    productOptions (): any[] {
      if (this.product.errors &&
          Object.keys(this.product.errors).length &&
          Object.keys(this.configuration).length
      ) {
        return []
      }

      if (this.product.configurable_options) {
        return this.sortedProductOptions || []
      }

      return []
    },
    sortedProductOptions () {
      return cloneDeep(this.product.configurable_options).map(o => {
        const attribute = Object.assign({ options: [] }, this.getAttributeListByCode[o.attribute_code])
        const { options } = attribute

        // Sort by attributes value `sort_order` parameter
        o.values = o.values.sort((a, b) => {
          const aValue = a.value_index
          const bValue = b.value_index

          let optionSortA = options.find(o => Number(o.value) === aValue)
          let optionSortB = options.find(o => Number(o.value) === bValue)
          optionSortA = optionSortA && optionSortA.sort_order ? optionSortA.sort_order : 0
          optionSortB = optionSortB && optionSortB.sort_order ? optionSortB.sort_order : 0

          return optionSortA - optionSortB
        })

        return o
      })
    },
    productOptionsLabelPlaceholder (): string|LocaleMessages {
      if (this.productOptions.length === 0 || this.productOptions.length > 1) {
        return i18n.t('Choose options')
      }

      if (/size/.test(this.productOptions[0].attribute_code)) {
        return i18n.t('Choose size')
      }

      const attribute = this.productOptions[0].label
      return i18n.t('Choose {attribute}', { attribute })
    },
    availableFilters (): Record<string, any> {
      let filtersMap = {}
      // TODO move to helper
      if (this.product && this.product.configurable_options) {
        this.productOptions.forEach(configurableOption => {
          const type = configurableOption.attribute_code
          const filterVariants = configurableOption.values.map(
            ({ value_index, label }) => {
              let currentVariant = this.options[type] ? this.options[type].find(config => config.id === value_index) : false
              label = label || (currentVariant ? currentVariant.label : value_index)
              return { id: value_index, label, type }
            }
          )
          filterVariants.map(option => Object.assign(option, { available: this.isOptionAvailable(option) }))
          filtersMap[type] = filterVariants
        })
      }
      return filtersMap
    },
    selectedFilters (): Record<string, any> {
      // TODO move to helper when refactoring product page
      let selectedFilters = {}
      if (this.configuration && this.product) {
        Object.keys(this.configuration).map(filterType => {
          const filter = this.configuration[filterType]
          selectedFilters[filterType] = {
            id: filter.id,
            label: filter.label,
            type: filterType
          }
        })
      }
      return selectedFilters
    }
  },
  methods: {
    /**
     * This is a copy of `@vue-storefront/core/modules/catalog/components/ProductOption.ts`
     * The original function uses the `isOptionAvailableAsync` method which won't return false if the specific option isn't available.
     * Thats because it uses `findConfigurableChildAsync` and just checks if it returns a variant, but the `findConfigurableChildAsync`
     * method returns the default or selected variant if the specific one isn't found, so it's true as long as one item is available.
     * That's why we make our own variant and check for the variant as well.
     * @param option
     */
    isOptionAvailable (option) {
      const currentConfig = Object.assign({}, this.configuration, { [option.type]: option })
      const variant = findConfigurableChildAsync({ product: this.product, configuration: currentConfig, availabilityCheck: true })
      return typeof variant !== 'undefined' && variant !== null && variant[option.type] === option.id
    }
  }
}
