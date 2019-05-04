import { mapMutations } from 'vuex'
import * as types from '../store/product/mutation-types'
import rootStore from '@vue-storefront/core/store'
import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

function _defaultOptionValue (co) {
  switch (co.type) {
    case 'radio': return co.values && co.values.length ? co.values[0].option_type_id : 0
    case 'checkbox': return false
    default: return ''
  }
}

function _fieldName (co) {
  return 'customOption_' + co.option_id
}

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
      inputValues: {
      },
      selectedOptions: {
      },
      validation: {
        rules: {},
        results: {}
      }
    }
  },
  created () {
    rootStore.dispatch('product/addCustomOptionValidator', {
      validationRule: 'required', // You may add your own custom fields validators elsewhere in the theme
      validatorFunction: (value) => {
        return { error: (value === null || value === '') || (value === false) || (value === 0), message: i18n.t('Field is required.') }
      }
    })
    this.setupInputFields()
  },
  methods: {
    ...mapMutations('product', {
      setCustomOptionValue: types.CATALOG_UPD_CUSTOM_OPTION // map `this.add()` to `this.$store.commit('increment')`
    }),
    setupInputFields () {
      for (let co of this.product.custom_options) {
        const fieldName = _fieldName(co)
        this['inputValues'][fieldName] = _defaultOptionValue(co)
        if (co.is_require) { // validation rules are very basic
          this.validation.rules[fieldName] = 'required' // TODO: add custom validators for the custom options
        }
        this.optionChanged(co, co.values && co.values.length > 0 ? co.values[0] : null)
      }
    },
    optionChanged (option, opval = null) {
      const fieldName = _fieldName(option)
      const value = opval === null ? this.inputValues[fieldName] : opval.option_type_id
      this.validateField(option)
      this.setCustomOptionValue({ optionId: option.option_id, optionValue: value })
      this.$store.dispatch('product/setCustomOptions', { product: this.product, customOptions: this.$store.state.product.current_custom_options }) // TODO: move it to "AddToCart"
      this.selectedOptions[fieldName] = (opval === null ? value : opval)
      this.$bus.$emit('product-after-customoptions', { product: this.product, option: option, optionValues: this.selectedOptions })
    },
    validateField (option) {
      const fieldName = _fieldName(option)
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
