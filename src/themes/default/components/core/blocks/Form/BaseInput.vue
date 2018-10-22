<template>
  <div class="relative">
    <div class="relative">
      <input
        class="
         py10 w-100 border-box brdr-none brdr-bottom-1
         brdr-cl-primary h4 sans-serif
       "
        :class="{pr30: type === 'password', empty: value === ''}"
        :type="type === 'password' ? passType : type"
        :name="name"
        :autocomplete="autocomplete"
        :value="value"
        :autofocus="autofocus"
        :ref="name"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur')"
        @keyup.enter="$emit('keyup.enter', $event.target.value)"
        @keyup="$emit('keyup', $event)"
      >
      <label>{{ placeholder }}</label>
    </div>
    <button
      v-if="iconActive"
      type="button"
      class="
        icon material-icons absolute brdr-none no-outline
        p0 bg-cl-transparent cl-brdr-secondary pointer
      "
      @click="togglePassType()"
      :aria-label="$t('Toggle password visibility')"
      :title="$t('Toggle password visibility')"
    >
      {{ icon }}
    </button>
    <template v-if="validation">
      <span class="block cl-error h6 mt8" v-if="validation.condition">
        {{ validation.text }}
      </span>
    </template>
    <template v-else-if="validations">
      <span
        v-for="(validation, index) in validations"
        :key="index"
        v-if="validation.condition"
        class="block cl-error h6 mt8"
        data-testid="errorMessage"
      >
        {{ validation.text }}
      </span>
    </template>
  </div>
</template>

<script>
import baseInput from '@vue-storefront/core/components/blocks/Form/BaseInput'

export default {
  mixins: [baseInput]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-puerto-rico: color(puerto-rico);
  $color-hover: color(tertiary, $colors-background);

  input {
    background: inherit;

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
    color:#999;
    position:absolute;
    pointer-events:none;
    user-select: none;
    left: 0;
    top: 10px;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }
  input:focus ~ label, input:not(.empty) ~ label{
    top: -10px;
    font-size:14px;
    color:$color-puerto-rico;
  }

  .icon {
    right: 6px;
    top: 10px;
    &:hover,
    &:focus {
      color: $color-hover;
    }
  }
</style>
