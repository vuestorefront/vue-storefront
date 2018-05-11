<template>
  <div>
    <div class="between-md" v-for="option in product.custom_options" :key="option.option_id">
      <label for="">{{ option.title }}</label>
    </div>
  </div>
</template>
<script>
import BaseInput from './blocks/Form/BaseInput.vue'
import BaseRadiobutton from './blocks/Form/BaseRadiobutton.vue'
import BaseCheckbox from './blocks/Form/BaseCheckbox.vue'
import { mapMutations } from 'vuex'
import * as types from 'core/store/mutation-types'
import rootStore from 'core/store'
import i18n from 'core/lib/i18n'

function _defaultOptionValue (co, field = 'id') {
  return co.product_links && co.product_links.length ? co.product_links.find(pl => { return pl.is_default })[field] : 0
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
  components: {
    BaseInput,
    BaseRadiobutton,
    BaseCheckbox
  },
  created () {
    rootStore.dispatch('product/addCustomOptionValidator', { validationRule: 'gtzero', // You may add your own custom fields validators elsewhere in the theme
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
          this.optionChanged(co, co.product_links && co.product_links.length > 0 ? co.product_links.find(pl => { return pl.is_default }) : null)
        }
      }
    },
    optionChanged (option, opval = null) {
      const fieldName = _fieldName(option)[0]
      const fieldNameQty = _fieldName(option)[1]
      const value = opval === null ? this.inputValues[fieldName] : opval.option_type_id
      this.validateField(option)
      this.setBundleOptionValue({ optionId: option.option_id, optionQty: parseInt(this.inputValues[fieldNameQty]), optionSelections: [value] })
      this.$store.dispatch('product/setBundleOptions', { product: this.product, bundleOptions: this.$store.state.product.current_bundle_options }) // TODO: move it to "AddToCart"
      this.selectedOptions[fieldName] = { value: (opval === null ? value : opval), qty: parseInt(this.inputValues[fieldNameQty]) }
      this.$bus.$emit('product-after-bundleoptions', { product: this.product, option: option, optionValues: this.selectedOptions })
    },
    isValid () {
      let isValid = true
      this.validation.results.map((res) => { if (res.error) isValid = false })
      return isValid
    },
    validateField (option) {
      for (let fieldName of _fieldName(option)) {
        const validationRule = this.validation.rules[fieldName]
        this.product.errors.custom_options = null
        if (validationRule) {
          const validator = this.$store.state.product.custom_options_validators[validationRule]
          if (typeof validator === 'function') {
            const validationResult = validator(this['inputValues'][fieldName])
            this.validation.results[fieldName] = validationResult
            if (validationResult.error) {
              this.product.errors.bundle_options = i18n.t('Please configure product bundle options and fix the validation errors')
            } else {
              this.product.errors.bundle_options = null
            }
          } else {
            console.error('No validation rule found for ', validationRule)
            this.validation.results[fieldName] = { error: false, message: '' }
          }
        } else {
          this.validation.results[fieldName] = { error: false, message: '' }
        }
      }
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
  }
}
</script>
