import { mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'
import { LocaleMessages } from 'vue-i18n'
import cloneDeep from 'lodash-es/cloneDeep'

export default {
  computed: {
    ...mapGetters({
      getAttributeLabel: 'attribute/getAttributeLabel',
      getAttributeListByCode: 'attribute/getAttributeListByCode'
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
    },
    sortedProductOptions () {
      return cloneDeep(this.product.configurable_options).map(o => {
        // Sort by attributes value `sort_order` parameter
        o.values = o.values.sort((a, b) => {
          const attribute = this.getAttributeListByCode[o.attribute_code]
          const { options } = attribute
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
    productOptionsLabel (): string|LocaleMessages {
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
          filterVariants.map(option => {
            option['available'] = this.isOptionAvailable(option)
            return option
          }
          )
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
  }
}
