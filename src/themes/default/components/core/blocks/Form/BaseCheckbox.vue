<template>
  <div>
    <div class="relative">
      <input
        class="checkbox-field"
        type="checkbox"
        :id="id"
        :checked="value"
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
    <span
      class="block cl-error h6"
      v-if="validationIf"
    >
      {{ validationText }}
    </span>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
export default {
  mixins: [coreComponent('blocks/Form/BaseCheckbox')]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-secondary: color(secondary);
  $color-white: color(white);

  .checkbox-field {
    position: absolute;
    top: 0;
    left: 0;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 22px;
      height: 22px;
      background-color: $color-white;
      border: 1px solid $color-secondary;
      cursor: pointer;
    }
    &:after {
      background-color: transparent;
    }
    &:checked {
      &:before {
        background-color: $color-secondary;
      }
      &:after {
        content: '';
        position: absolute;
        top: 6px;
        left: 5px;
        width: 11px;
        height: 5px;
        border: 3px solid $color-white;
        border-top: none;
        border-right: none;
        background-color: $color-secondary;
        transform: rotate(-45deg);
        cursor: pointer;
      }
    }
  }
</style>

