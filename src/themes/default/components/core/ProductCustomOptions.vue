<template>
  <form class="custom-options">
    <div v-for="option in product.custom_options" :key="('customOption_' + option.option_id)">
      <div class="custom-option mb15">
        <h4>{{ option.title }}</h4>
        <input
          class="
            py10 w-100 border-box brdr-none brdr-bottom
            brdr-cl-primary h4 sans-serif
          "
          v-if="option.type === 'field'"
          type="text"
          :name="('customOption_' + option.option_id)"
          focus
          v-model="inputValues[('customOption_' + option.option_id)]"
          :placeholder="option.title"
          @change="optionChanged(option)">
        <div class="m5 relative" v-for="opval in option.values" :key="opval.option_type_id" v-if="option.type === 'radio'">
          <input
            @input="optionChanged(option)"
            type="radio"
            class="m0 no-outline"
            :name="('customOption_' + option.option_id)"
            :id="('customOption_' + opval.option_type_id)"
            focus
            :value="opval.option_type_id"
            v-model="inputValues[('customOption_' + option.option_id)]"
          ><label class="pl10 lh20 h4 pointer" :for="('customOption_' + opval.option_type_id)" v-html="opval.title" />
        </div>
        <div class="m5 relative" v-for="opval in option.values" :key="opval.option_type_id" v-if="option.type === 'checkbox'">
          <input
            @change="optionChanged(option)"
            type="checkbox"
            class="m0 no-outline"
            :name="('customOption_' + option.option_id)"
            :id="('customOption_' + opval.option_type_id)"
            focus
            :value="opval.option_type_id"
            v-model="inputValues[('customOption_' + option.option_id)]"
          ><label class="pl10 lh20 h4 pointer" :for="('customOption_' + opval.option_type_id)" v-html="opval.title" />
        </div>
        <span class="error" v-if="validation.results[('customOption_' + option.option_id)].error">{{ validation.results[('customOption_' + option.option_id)].message }}</span>
      </div>
    </div>
  </form>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import BaseInput from './blocks/Form/BaseInput.vue'
import BaseRadiobutton from './blocks/Form/BaseRadiobutton.vue'
import BaseCheckbox from './blocks/Form/BaseCheckbox.vue'
import { mapMutations } from 'vuex'
import * as types from 'core/store/mutation-types'
import rootStore from 'core/store'
import _ from 'lodash'
import i18n from 'core/lib/i18n'

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

export default {
  name: 'ProductCustomOptions',
  mixins: [coreComponent('ProductCustomOptions')],
  components: {
    BaseInput,
    BaseRadiobutton,
    BaseCheckbox
  },
  created () {
    rootStore.dispatch('product/addCustomOptionValidator', { validationRule: 'required', // You may add your own custom fields validators elsewhere in the theme
      validatorFunction: (value) => {
        return { error: (typeof value === 'string' && _.isEmpty(value)) || (value === false), message: i18n.t('Field is required.') }
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
        this.optionChanged(co)
      }
    },
    optionChanged (option) {
      const fieldName = _fieldName(option)
      this.validateField(option)
      this.setCustomOptionValue({ optionId: option.option_id, optionValue: this.inputValues[fieldName] })
      this.$store.dispatch('product/setCustomOptions', { product: this.product, customOptions: this.$store.state.product.current_custom_options }) // TODO: move it to "AddToCart"
    },
    validateField (option) {
      const fieldName = _fieldName(option)
      const validationRule = this.validation.rules[fieldName]
      if (validationRule) {
        const validator = this.$store.state.product.custom_options_validators[validationRule]
        if (typeof validator === 'function') {
          this.validation.results[fieldName] = validator(this['inputValues'][fieldName])
        } else {
          console.error('No validation rule found for ', validationRule)
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
  },
  data () {
    return {
      inputValues: {
      },
      validation: {
        rules: {},
        results: {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-hover: color(tertiary, $colors-background);

  $bg-secondary: color(secondary, $colors-background);
  $color-secondary: color(secondary);
  $color-error: color(error);

  .custom-option > label {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .error {
    color: $color-error;
    padding-top: 5px;
    display: block;
  }
  $color-silver: color(silver);
  $color-active: color(secondary);
  $color-white: color(white);

  .relative label {
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    line-height: 30px;
    &:before {
      content: '';
      position: absolute;
      top: 3px;
      left: 0;
      width: 22px;
      height: 22px;
      background-color: $color-white;
      border: 1px solid $color-silver;
      cursor: pointer;
    }
  }
  input[type='text'] {
    transition: 0.3s all;
    &::-webkit-input-placeholder {
      color: $color-tertiary;
    }
    &::-moz-placeholder {
      color: $color-tertiary;
    }
    &:hover,
    &:focus {
      outline: none;
      border-color: $color-black;
    }
    background: inherit;
  }
  input[type='radio'] {
    position: absolute;
    top: 3px;
    left: 0;
    &:checked + label {
      &:before {
        background-color: $color-silver;
        border-color: $color-silver;
        cursor: pointer;
      }
      &:after {
        content: '';
        position: absolute;
        top: 9px;
        left: 5px;
        width: 11px;
        height: 5px;
        border: 3px solid $color-white;
        border-top: none;
        border-right: none;
        background-color: $color-silver;
        transform: rotate(-45deg);
      }
    }
    &:hover,
    &:focus {
      + label {
        &:before {
          border-color: $color-active;
        }
      }
    }
    &:disabled + label {
      cursor: not-allowed;
      &:hover,
      &:focus {
        &:before {
          border-color: $color-silver;
          cursor: not-allowed;
        }
      }
    }
  }
  input[type='checkbox'] {
    position: absolute;
    top: 3px;
    left: 0;
    &:checked + label {
      &:before {
        background-color: $color-silver;
        border-color: $color-silver;
        cursor: pointer;
      }
      &:after {
        content: '';
        position: absolute;
        top: 9px;
        left: 5px;
        width: 11px;
        height: 5px;
        border: 3px solid $color-white;
        border-top: none;
        border-right: none;
        background-color: $color-silver;
        transform: rotate(-45deg);
      }
    }
    &:hover,
    &:focus {
      + label {
        &:before {
          border-color: $color-active;
        }
      }
    }
    &:disabled + label {
      cursor: not-allowed;
      &:hover,
      &:focus {
        &:before {
          border-color: $color-silver;
          cursor: not-allowed;
        }
      }
    }
  }
</style>

