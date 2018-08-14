<template>
  <div>
    <div class="relative">
      <input
        class="m0 no-outline"
        type="radio"
        :id="id"
        :checked="value"
        @keyup.enter="$emit('click')"
        @click="$emit('click')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        :disabled="disabled"
      >
      <label
        class="pl35 lh30 h4 pointer"
        :for="id"
      >
        <slot/>
      </label>
    </div>
    <template v-if="validation">
      <span
        class="block cl-error h6"
        v-if="validation.condition"
      >
        {{ validation.text }}
      </span>
    </template>
  </div>
</template>

<script>
import BaseRadiobutton from '@vue-storefront/core/components/blocks/Form/BaseRadiobutton'

export default {
  mixins: [BaseRadiobutton]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-silver: color(silver);
  $color-active: color(secondary);
  $color-white: color(white);

  label {
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

  input {
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
