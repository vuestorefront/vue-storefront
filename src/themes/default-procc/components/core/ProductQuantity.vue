<template>
  <div class="product-quantity">
    <base-input-number
      :disabled="disabled"
      :max="max"
      :min="1"
      :name="name"
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
      :value="value"
      @blur="$v.$touch()"
      @input="$emit('input', $event)"
    />
    <spinner v-if="loading"/>
  </div>
</template>

<script>
  import {maxValue, minValue, numeric, required} from 'vuelidate/lib/validators'
  import {onlineHelper} from '@vue-storefront/core/helpers'
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
      maxQuantity: {
        type: Number,
        required: true
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
      isOnline(value) {
        return onlineHelper.isOnline
      },
      max() {
        return this.isOnline ? this.maxQuantity : null
      },
      disabled() {
        return this.isOnline ? !this.maxQuantity : false
      },
      name() {
        if (this.isSimpleOrConfigurable && !this.loading && this.showQuantity) {
          return this.$i18n.t(this.isOnline ? 'Quantity available' : 'Quantity available offline', {qty: this.maxQuantity})
        }
        return this.$i18n.t('Quantity')
      }
    },
    validations() {
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
      '$v.$invalid'(error) {
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
