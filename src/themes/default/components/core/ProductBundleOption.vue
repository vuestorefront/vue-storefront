<template>
  <div class="custom-option mb15">
    <h4> {{ option.title }} </h4>
    <div class="m5 relative" v-for="opval in option.product_links" :key="opval.id">
      <input
        type="radio"
        class="m0 no-outline"
        :name="bundleOptionName + opval.id"
        :id="bundleOptionName + opval.id"
        focus
        :value="opval.id"
        v-model="productOptionId"
      >
      <label v-if="opval.product" class="pl10 lh20 h4 pointer" :for="bundleOptionName + opval.id" v-html="opval.product.name" />
    </div>
    <div>
      <label class="qty-label flex" :for="quantityName">{{ $t('Quantity') }}</label>
      <input
        type="number"
        min="0"
        class="m0 no-outline qty-input py10 brdr-cl-primary bg-cl-transparent h4"
        :name="quantityName"
        :id="quantityName"
        focus
        v-model="quantity"
      >
    </div>
    <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { ProductBundleOption } from '@vue-storefront/core/modules/catalog/components/ProductBundleOption.ts'

export default {
  mixins: [ProductBundleOption]
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
