<template>
  <div class="select-wrapper relative">
    <select
      :name="name"
      :class="{
        'cl-tertiary' : options.length === 0,
        'empty': !selected
      }"
      :autocomplete="autocomplete"
      @focus="$emit('focus');"
      @blur="$emit('blur');"
      @change="$emit('input', $event.target.value)"
    >
      <option v-if="!selected"/>
      <option
        v-for="(option, key) in options"
        :key="key"
        :value="option.value"
        v-bind="{selected: option.value === selected}"
      >
        {{ option.label }}
      </option>
    </select>
    <label>{{ placeholder }}</label>

    <template if="validations">
      <span
        v-for="(validation, index) in validations"
        :key="index"
        v-if="validation.condition"
        class="block cl-error h6"
      >
        {{ validation.text }}
      </span>
    </template>
  </div>
</template>

<script>
import BaseSelect from '@vue-storefront/core/components/blocks/Form/BaseSelect'

export default {
  mixins: [BaseSelect]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  @import '~theme/css/base/text';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-puerto-rico: color(puerto-rico);
  $color-hover: color(tertiary, $colors-background);

.select-wrapper {
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 6px 0 6px;
    border-color: $color-tertiary transparent transparent transparent;
    pointer-events: none;
  }

  select {
    @extend .h4;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid $color-tertiary;
    width: 100%;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    background-color: transparent;

    &:hover,
    &:focus {
      outline: none;
      border-color: $color-puerto-rico;
    }

    &:disabled,
    &:disabled + label {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  label {
    color: #999;
    position: absolute;
    pointer-events: none;
    user-select: none;
    left: 13px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  select:focus ~ label, select:not(.empty) ~ label {
    top: -10px;
    font-size: 14px;
    color: $color-puerto-rico;
  }
}
</style>
