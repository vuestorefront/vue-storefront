import { mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'
import { LocaleMessages } from 'vue-i18n'

export default {
  computed: {
    ...mapGetters({
      getAttributeLabel: 'attribute/getAttributeLabel'
    }),
    productOptions (): any[] {
      if (this.product.errors &&
          Object.keys(this.product.errors).length &&
          Object.keys(this.configuration).length
      ) {
        return []
      }
      return this.product.configurable_options || []
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
        this.product.configurable_options.forEach(configurableOption => {
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
