<template>
  <div class="product-quantity">
    <base-input-number
      :name="name"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      @input="$emit('input', $event)"
      @blur="$v.$touch()"
      only-positive
      :validations="[
        {
          condition: !$v.value.numeric || !$v.value.minValue || !$v.value.required,
          text: $t(`Quantity must be positive integer`)
        },
        {
          condition: maxQuantity && value && !$v.value.maxValue,
          text: $t('Quantity must be below {quantity}', { quantity: maxQuantity })
        }
      ]"
    />
    <spinner v-if="loading" />
  </div>
</template>

<script>
import { minValue, maxValue, numeric, required } from 'vuelidate/lib/validators'
import { onlineHelper } from '@vue-storefront/core/helpers'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import Spinner from 'theme/components/core/Spinner'

export default {
  components: {
    Spinner,
    BaseInputNumber
  },
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    showQuantity: {
      type: Boolean,
      default: false
    },
    minQuantity: {
      type: Number,
      default: 1
    },
    maxQuantity: {
      type: Number,
      default: undefined
    },
    stepQuantity: {
      type: Number,
      default: 1
    },
    checkMaxQuantity: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    isSimpleOrConfigurable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isOnline (value) {
      return onlineHelper.isOnline
    },
    min () {
      return this.minQuantity
    },
    max () {
      if (!this.isOnline || !this.isSimpleOrConfigurable) {
        return null
      }

      return this.maxQuantity
    },
    step () {
      return this.stepQuantity
    },
    disabled () {
      if (!this.isOnline) {
        return false
      }
      return !this.maxQuantity && this.checkMaxQuantity && this.isSimpleOrConfigurable
    },
    name () {
      if (this.isSimpleOrConfigurable && !this.loading && this.showQuantity) {
        return this.$i18n.t(this.isOnline ? 'Quantity available' : 'Quantity available offline', { qty: this.maxQuantity })
      }
      return this.$i18n.t('Quantity')
    }
  },
  validations () {
    return {
      value: {
        minValue: minValue(1),
        maxValue: maxValue(this.max) && !this.isSimpleOrConfigurable,
        numeric,
        required
      }
    }
  },
  watch: {
    '$v.$invalid' (error) {
      this.$emit('error', error)
    }
  }
}
</script>
<style lang="scss" scoped>
.product-quantity {
  position: relative;
  /deep/ .spinner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}
</style>
