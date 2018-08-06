import { mapMutations } from 'vuex'
import * as types from '@vue-storefront/store/mutation-types'
import rootStore from '@vue-storefront/store'
import i18n from '@vue-storefront/core/lib/i18n'

function _defaultOptionValue (co, field = 'id') {
  if (co.product_links && co.product_links.length) {
    const defaultOption = co.product_links.find(pl => { return pl.is_default })
    if (defaultOption) {
      return field === '*' ? defaultOption : defaultOption[field]
    } else {
      return field === '*' ? co.product_links[0] : co.product_links[0][field]
    }
  } else {
    return field === '*' ? null : 0
  }
}

function _fieldName (co) {
  return ['bundleOption_' + co.option_id, 'bundleOptionQty_' + co.option_id]
}

export default {
  name: 'ProductBundleOptions',
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
      validationRule: 'gtzero', // You may add your own custom fields validators elsewhere in the theme
      validatorFunction: (value) => {
        return { error: (value === null || value === '') || (value === false) || (value <= 0), message: i18n.t('Must be greater than 0') }
      }
    })
    this.setupInputFields()
  },
  methods: {
    ...mapMutations('product', {
      setBundleOptionValue: types.CATALOG_UPD_BUNDLE_OPTION // map `this.add()` to `this.$store.commit('increment')`
    }),
    setupInputFields () {
      for (let co of this.product.bundle_options) {
        for (let fieldName of _fieldName(co)) {
          this['inputValues'][fieldName] = _defaultOptionValue(co, fieldName.indexOf('Qty') > 0 ? 'qty' : 'id')
          if (co.required) { // validation rules are very basic
            this.validation.rules[fieldName] = 'gtzero' // TODO: add custom validators for the custom options
          }
        }
        this.optionChanged(co, _defaultOptionValue(co, '*'))
      }
    },
    optionChanged (option, opval = null) {
      const fieldName = _fieldName(option)[0]
      if (opval === null) {
        const existingField = this.selectedOptions[fieldName]
        if (existingField && existingField.hasOwnProperty('value') && typeof existingField.value === 'object') {
          opval = existingField.value
        }
      }
      const fieldNameQty = _fieldName(option)[1]
      const value = opval === null ? this.inputValues[fieldName] : opval.id
      this.setBundleOptionValue({ optionId: option.option_id, optionQty: parseInt(this.inputValues[fieldNameQty]), optionSelections: [value] })
      this.$store.dispatch('product/setBundleOptions', { product: this.product, bundleOptions: this.$store.state.product.current_bundle_options }) // TODO: move it to "AddToCart"
      this.selectedOptions[fieldName] = { value: (opval === null ? value : opval), qty: parseInt(this.inputValues[fieldNameQty]) }
      if (this.validateField(option)) {
        this.$bus.$emit('product-after-bundleoptions', { product: this.product, option: option, optionValues: this.selectedOptions })
      }
    },
    isValid () {
      let isValid = true
      this.validation.results.map((res) => { if (res.error) isValid = false })
      return isValid
    },
    validateField (option) {
      let result = true
      for (let fieldName of _fieldName(option)) {
        const validationRule = this.validation.rules[fieldName]
        this.product.errors.custom_options = null
        if (validationRule) {
          const validator = this.$store.state.product.custom_options_validators[validationRule]
          if (typeof validator === 'function') {
            const validationResult = validator(this['inputValues'][fieldName])
            this.validation.results[fieldName] = validationResult
            if (validationResult.error) {
              this.product.errors['bundle_options_' + fieldName] = i18n.t('Please configure product bundle options and fix the validation errors')
              result = false
            } else {
              this.product.errors['bundle_options_' + fieldName] = null
            }
          } else {
            console.error('No validation rule found for ', validationRule)
            this.validation.results[fieldName] = { error: false, message: '' }
          }
        } else {
          this.validation.results[fieldName] = { error: false, message: '' }
        }
      }
      return result
    }
  }
}
