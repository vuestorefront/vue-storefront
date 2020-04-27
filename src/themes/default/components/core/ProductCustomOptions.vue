<template>
  <form class="custom-options">
    <div v-for="option in product.custom_options" :key="('customOption_' + option.option_id)">
      <div class="custom-option mb15">
        <h4>{{ option.title }}</h4>
        <input
          class="
            py10 w-100 border-box brdr-none brdr-bottom-1
            brdr-cl-primary h4 sans-serif
          "
          v-if="option.type === 'field'"
          type="text"
          :name="('customOption_' + option.option_id)"
          focus
          v-model="inputValues[('customOption_' + option.option_id)]"
          :placeholder="option.title"
          @change="optionChanged(option)"
        >
        <div v-if="option.type === 'radio' || option.type === 'select' || option.type === 'drop_down'">
          <div class="m5 relative" v-for="opval in option.values" :key="opval.option_type_id">
            <input
              @change="optionChanged(option)"
              type="radio"
              class="m0 no-outline"
              :name="('customOption_' + option.option_id)"
              :id="('customOption_' + option.option_id + '_' + opval.option_type_id)"
              focus
              :value="opval.option_type_id"
              v-model="inputValues[('customOption_' + option.option_id)]"
            ><label class="pl10 lh20 h4 pointer" :for="('customOption_' + option.option_id +'_' + opval.option_type_id)" v-html="opval.title" />
          </div>
        </div>
        <div v-if="option.type === 'checkbox'">
          <div class="m5 relative" v-for="opval in option.values" :key="opval.option_type_id">
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
        </div>
        <span class="error" v-if="validation.results[('customOption_' + option.option_id)].error">{{ validation.results[('customOption_' + option.option_id)].message }}</span>
      </div>
    </div>
  </form>
</template>

<script>
import { ProductCustomOptions } from '@vue-storefront/core/modules/catalog/components/ProductCustomOptions.ts'

export default {
  mixins: [ProductCustomOptions]
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
  input[type='radio'], input[type='checkbox']  {
    position: absolute;
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
</style>
