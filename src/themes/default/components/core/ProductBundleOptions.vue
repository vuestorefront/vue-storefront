<template>
  <form class="custom-options">
    <div v-for="option in product.bundle_options" :key="('bundleOption_' + option.option_id)">
      <div class="custom-option mb15">
        <h4>{{ option.title }}</h4>
        <div class="m5 relative" v-for="opval in option.product_links" :key="opval.id">
          <input
            @change="optionChanged(option, opval)"
            type="radio"
            class="m0 no-outline"
            :name="('bundleOption_' + option.option_id)"
            :id="('bundleOption_' + opval.id)"
            focus
            :value="opval.id"
            v-model="inputValues[('bundleOption_' + option.option_id)]"
          >
          <label v-if="opval.product" class="pl10 lh20 h4 pointer" :for="('bundleOption_' + opval.id)" v-html="opval.product.name" />
        </div>
        <div>
          <label class="qty-label flex" :for="('bundleOptionQty_' + option.option_id)">{{ $t('Quantity') }}</label>
          <input
            @change="optionChanged(option)"
            type="number"
            min="0"
            class="m0 no-outline qty-input py10 brdr-cl-primary bg-cl-transparent h4"
            :name="('bundleOptionQty_' + option.option_id)"
            :id="('bundleOptionQty_' + option.option_id)"
            focus
            v-model="inputValues[('bundleOptionQty_' + option.option_id)]"
          >
          <span class="error" v-if="errorMessages['bundleOptionQty_' + option.option_id]">{{ errorMessages['bundleOptionQty_' + option.option_id] }}</span>
          <span class="error" v-if="errorMessages['bundleOption_' + option.option_id]">{{ errorMessages['bundleOption_' + option.option_id] }}</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import ProductBundleOptions from '@vue-storefront/core/components/ProductBundleOptions'

export default {
  mixins: [ProductBundleOptions]
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
  .qty-input {
    border-style: solid;
    border-width: 0 0 1px 0;
    width: 90px;
  }

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

  .relative label.qty {
    padding-left: 5px;
  }

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
  input[type='radio'], input[type='checkbox']  {
    position: absolute;
    top: 3px;
    left: 0;
    opacity: 0;
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
  .qty-label {
    font-size: 12px !important;
    padding-left: 0px !important;
  }
</style>
