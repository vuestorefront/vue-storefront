import { mapMutations } from 'vuex'
import * as types from '../store/product/mutation-types'
import rootStore from '@vue-storefront/core/store'
import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

function _fieldName (co) {
  return ['bundleOption_' + co.option_id, 'bundleOptionQty_' + co.option_id]
}

export const ProductBundleOptions = {
  name: 'ProductBundleOptions',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectedOptions: {},
      validationRules: {},
      validationResults: {}
    }
  },
  computed: {
    /**
     * Error messages map for validation options
     */
    errorMessages () {
      let messages = {}
      Object.keys(this.validationResults).map(optionKey => {
        const validationResult = this.validationResults[optionKey]
        if (validationResult.error) {
          messages[optionKey] = validationResult.message
        }
      })
      return messages
    }
  },
  beforeMount () {
    this.setupValidationRules()
  },
  methods: {
    ...mapMutations('product', {
      setBundleOptionValue: types.PRODUCT_SET_BUNDLE_OPTION // map `this.add()` to `this.$store.commit('increment')`
    }),
    setupValidationRules () {
      rootStore.dispatch('product/addCustomOptionValidator', {
        validationRule: 'gtzero', // You may add your own custom fields validators elsewhere in the theme
        validatorFunction: (value) => {
          return { error: (value === null || value === '') || (value === false) || (value <= 0), message: i18n.t('Must be greater than 0') }
        }
      })

      for (let co of this.product.bundle_options) {
        for (let fieldName of _fieldName(co)) {
          if (co.required) { // validation rules are very basic
            this.validationRules[fieldName] = 'gtzero' // TODO: add custom validators for the custom options
          }
        }
      }
    },
    optionChanged ({ fieldName, option, qty, value }) {
      if (!fieldName) return
      this.setBundleOptionValue({ optionId: option.option_id, optionQty: parseInt(qty), optionSelections: [parseInt(value.id)] })
      this.$store.dispatch('product/setBundleOptions', { product: this.product, bundleOptions: this.$store.state.product.current_bundle_options }) // TODO: move it to "AddToCart"
      this.selectedOptions[fieldName] = { qty, value }
      const valueId = value ? value.id : null
      if (this.validateField(option, qty, valueId)) {
        this.$bus.$emit('product-after-bundleoptions', { product: this.product, option: option, optionValues: this.selectedOptions })
      }
    },
    isValid () {
      let isValid = true
      this.validationResults.map((res) => { if (res.error) isValid = false })
      return isValid
    },
    validateField (option, qty, optionId) {
      let result = true
      let validationResult = { error: false, message: '' }
      for (let fieldName of _fieldName(option)) {
        const validationRule = this.validationRules[fieldName]
        this.product.errors.custom_options = null
        if (validationRule) {
          const validator = this.$store.state.product.custom_options_validators[validationRule]
          if (typeof validator === 'function') {
            const quantityValidationResult = validator(qty)
            if (quantityValidationResult.error) validationResult = quantityValidationResult
            const optionValidationResult = validator(optionId)
            if (optionValidationResult.error) validationResult = optionValidationResult
            this.$set(this.validationResults, fieldName, validationResult)
            if (validationResult.error) {
              this.product.errors['bundle_options_' + fieldName] = i18n.t('Please configure product bundle options and fix the validation errors')
              result = false
            } else {
              this.product.errors['bundle_options_' + fieldName] = null
            }
          } else {
            Logger.error('No validation rule found for ' + validationRule, 'components-product-bundle-options')()
            this.$set(this.validationResults, fieldName, validationResult)
          }
        } else {
          this.$set(this.validationResults, fieldName, validationResult)
        }
      }
      return result
    }
  }
}
