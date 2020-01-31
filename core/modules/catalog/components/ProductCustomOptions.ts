import { customOptionFieldName, selectedCustomOptionValue, defaultCustomOptionValue } from '@vue-storefront/core/modules/catalog/helpers/customOption';
import { mapMutations } from 'vuex'
import * as types from '../store/product/mutation-types'
import rootStore from '@vue-storefront/core/store'
import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

export const ProductCustomOptions = {
  name: 'ProductCustomOptions',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      inputValues: {},
      validation: {
        rules: {},
        results: {}
      }
    }
  },
  computed: {
    selectedOptions () {
      const customOptions = this.product.custom_options
      if (!customOptions) {
        return {}
      }

      return customOptions.reduce((selectedOptions, option) => {
        const fieldName = customOptionFieldName(option)
        selectedOptions[fieldName] = selectedCustomOptionValue(option.type, option.values, this.inputValues[fieldName])
        return selectedOptions
      }, {})
    }
  },
  created () {
    rootStore.dispatch('product/addCustomOptionValidator', {
      validationRule: 'required', // You may add your own custom fields validators elsewhere in the theme
      validatorFunction: (value) => {
        const error = Array.isArray(value) ? !value.length : !value
        const message = i18n.t('Field is required.')
        return { error, message }
      }
    })
    this.setupInputFields()
  },
  methods: {
    ...mapMutations('product', {
      setCustomOptionValue: types.PRODUCT_SET_CUSTOM_OPTION // map `this.add()` to `this.$store.commit('increment')`
    }),
    setupInputFields () {
      for (const customOption of this.product.custom_options) {
        const fieldName = customOptionFieldName(customOption)
        this.$set(this.inputValues, fieldName, defaultCustomOptionValue(customOption))
        if (customOption.is_require) { // validation rules are very basic
          this.$set(this.validation.rules, fieldName, 'required') // TODO: add custom validators for the custom options
        }
        this.optionChanged(customOption)
      }
    },
    optionChanged (option) {
      const fieldName = customOptionFieldName(option)
      this.validateField(option)
      this.setCustomOptionValue({ optionId: option.option_id, optionValue: this.selectedOptions[fieldName] })
      this.$store.dispatch('product/setCustomOptions', { product: this.product, customOptions: this.$store.state.product.current_custom_options }) // TODO: move it to "AddToCart"
      this.$bus.$emit('product-after-customoptions', { product: this.product, option: option, optionValues: this.selectedOptions })
    },
    validateField (option) {
      const fieldName = customOptionFieldName(option)
      const validationRule = this.validation.rules[fieldName]
      this.product.errors.custom_options = null
      if (validationRule) {
        const validator = this.$store.state.product.custom_options_validators[validationRule]
        if (typeof validator === 'function') {
          const validationResult = validator(this['inputValues'][fieldName])
          this.validation.results[fieldName] = validationResult
          if (validationResult.error) {
            this.product.errors['custom_options_' + fieldName] = i18n.t('Please configure product custom options and fix the validation errors')
          } else {
            this.product.errors['custom_options_' + fieldName] = null
          }
        } else {
          Logger.error('No validation rule found for ' + validationRule, 'components-product-custom-options')()
          this.validation.results[fieldName] = { error: false, message: '' }
        }
      } else {
        this.validation.results[fieldName] = { error: false, message: '' }
      }
    },
    isValid () {
      let isValid = true
      this.validation.results.map((res) => { if (res.error) isValid = false })
      return isValid
    }
  }
}
