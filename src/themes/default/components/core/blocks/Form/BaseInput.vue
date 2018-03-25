<template>
  <div class="relative">
    <input
      class="
        py10 w-100 border-box brdr-none brdr-bottom
        brdr-cl-primary h4 weight-200 sans-serif
      "
      :class="{pr30: type === 'password'}"
      :type="type === 'password' ? passType : type"
      :name="name"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="value"
      :ref="focus ? name : false"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
      @keyup.enter="$emit('keyup.enter', $event.target.value)"
    >
    <button
      v-if="iconActive"
      type="button"
      class="
        icon material-icons absolute brdr-none no-outline
        p0 bg-cl-transparent cl-brdr-secondary pointer
      "
      @click="togglePassType()"
      :aria-label="$t('Toggle password visibility')"
    >
      {{ icon }}
    </button>
    <template v-if="validation">
      <span class="block cl-error h6" v-if="validation.condition">
        {{ validation.text }}
      </span>
    </template>
    <template v-else-if="validations">
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
import { coreComponent } from 'core/lib/themes'
export default {
  mixins: [coreComponent('blocks/Form/BaseInput')]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-hover: color(tertiary, $colors-background);

  input {
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

  .icon {
    right: 6px;
    top: 10px;
    &:hover,
    &:focus {
      color: $color-hover;
    }
  }
</style>
